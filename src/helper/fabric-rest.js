import ky from 'ky';
import { getArrayBufferFromBase64, getBase64FromArrayBuffer } from '@/helper/data';

/**
 * Single endorsement response
 * @typedef {Object} EndorsementResponse
 * @property {Object} endorsement
 * @property {string} endorsement.endorser Endorser information e.g. certificate
 * @property {string} endorsement.signature Endorser's signature of the proposal
 * @property {string} payload The payload of the response which includes endorsement and response
 * @property {Object} response Query result data
 * @property {number} response.status HTTP status for the response.
 * @property {string} response.message additional information for the status
 * @property {string} response.payload The actual query result returned from chaincode
 */

/**
 * Errors got from target peers after sent a proposal
 * @typedef {Object} EndorsementError
 * @property {string} message Error message
 * @property {string} name Error title name
 */

/**
 * Multiple endorsement responses got from target peers
 * @typedef {Object} EndorsementResponses
 * @property {Array<EndorsementResponse>} responses Responses from target peers
 * @property {Array<EndorsementError>} errors array of errors got from target peers
 */

/**
 * Hyperledger Fabric node information in a single channel
 * @typedef {Object} ChannelNodeInfo
 * @property {Array<string>} orderers list of ordering service nodes
 * @property {Object.<string, Array<string>>} peers list of peer nodes
 */

/**
 * Hyperledger Fabric network node names
 * @typedef {Object.<string, ChannelNodeInfo>} NetworkNodeInfo
 */

/**
 * Transient map where key is transient field key name
 * and value is the data encoded in base64 format
 * @typedef {Object.<string, string>} TransientMap
 */

/**
 * Event service result status
 * @typedef {Object} EventServiceStatus
 * @property {string} code status code for the given listener
 * @property {string} block block number that contains the object that we are listening
 */

/**
 * Event service listener information
 * @typedef {Object} EventListener
 * @property {string} type type of listener. Currently only supported 'transaction'
 * @property {string} id ID of the entity that would like to listen to which depending on type.
 * For transactions, the ID is transaction ID
 */

/**
 * Hyperledger Fabric HTTP client providing mechanism to sign proposal and transaction
 * then send to server
 */
class FabricHTTPClient {
  /**
   * KY.js instance used to send HTTP request to server
   * @type {ky}
   */
  ky;

  /**
   * Channel name
   * @type {string}
   */
  channel;

  /**
   * Chaincode name used to invoke functions
   * @type {string}
   */
  chaincode;

  /**
   * MSP ID of this user's organization
   * @type {string}
   */
  mspid;

  /**
   * Certificate string in PEM-encoded
   * @type {string}
   */
  certificate;

  /**
   * Signing key (private key)
   * @type {CryptoKey}
   */
  signingKey;

  /**
   * Proposal payload used to create signature of the proposal in base64 format
   * @type {?string}
   */
  proposalPayload = null;

  /**
   * Transaction ID which is temporarily stored
   * @type {?string}
   */
  transactionId = null;

  /**
   * Endorsement responses got after sent a proposal to target peers
   * @type {?EndorsementResponses}
   */
  proposalResponses = null;

  /**
   * Transaction payload used to create signature of the transaction in base64 format
   * @type {?string}
   */
  transactionPayload = null;

  /**
   * Event service payload encoded in base64 format used to create signature of it
   * This will be used to subscribe an event service on target peer
   * so that we can wait for transactions to be committed to ledger
   * @type {?string}
   */
  eventServicePayload = null;

  /**
   * Event service status
   * @type {?EventServiceStatus}
   */
  eventServiceStatus = null;

  /**
   * Hyperledger Fabric nodes information
   * @type {?NetworkNodeInfo}
   */
  fabricNodeNames = null;

  /**
   * Constructor
   * @param {string} certificate Certificate string with PEM-encoded
   * @param {CryptoKey} privateKey Private key used for signing
   * @param {string} channel Channel name
   * @param {string} chaincode Chaincode name
   * @param {string} mspid MSP ID of the user's organization
   */
  constructor(certificate, privateKey, channel, chaincode, mspid) {
    this.ky = ky.extend({
      prefixUrl: process.env.VUE_APP_FABRIC_API_URL,
    });
    this.certificate = btoa(certificate);
    this.signingKey = privateKey;
    this.channel = channel;
    this.chaincode = chaincode;
    this.mspid = mspid;
  }

  /**
   * Create signature based on the given data
   * @param {string} dataBase64 data in base64 format
   * @returns {Promise<string>} base64 encoded signature
   */
  async sign(dataBase64) {
    const data = getArrayBufferFromBase64(dataBase64);
    const signatureBytes = await window.crypto.subtle.sign({
      name: 'ECDSA',
      hash: {
        name: process.env.VUE_APP_SIGNING_HASH,
      },
    },
    this.signingKey,
    data);
    const signature = getBase64FromArrayBuffer(signatureBytes);
    return signature;
  }

  async loadFabricNodeNames() {
    this.fabricNodeNames = await this.ky.get('network/info').json();
  }

  getFabricNodeNames() {
    return this.fabricNodeNames;
  }

  /**
   * Get unsigned proposal
   * @param {string} functionName Chaincode function name
   * @param {Array<string>} args Arguments for the given function
   * @param {TransientMap} transientMap Transient maps used to send
   * chaincode function argument privately
   */
  async getUnsignedProposal(functionName, args, transientMap = {}) {
    const response = await this.ky.post('proposal/create', {
      json: {
        cert: this.certificate,
        channel: this.channel,
        chaincode: this.chaincode,
        mspid: this.mspid,
        invoke: {
          fcn: functionName,
          args,
          transientMap,
        },
      },
    }).json();
    this.proposalPayload = response.proposal;
    this.transactionId = response.transactionId;
  }

  /**
   * Get transaction ID based on proposal generated by backend
   * @returns {string} transaction ID
   */
  getTransactionId() {
    return this.transactionId;
  }

  /**
   * Send signed proposal to target peers
   * @param {Array<string>} targetPeers Target peers which will receive the signed proposal
   */
  async sendSignedProposal(targetPeers) {
    if (this.proposalPayload) {
      const signature = await this.sign(this.proposalPayload);
      const responses = await this.ky.post('proposal/send', {
        json: {
          channel: this.channel,
          chaincode: this.chaincode,
          proposal: {
            payload: this.proposalPayload,
            signature: {
              type: 'raw',
              value: signature,
            },
          },
          peers: targetPeers,
        },
      }).json();
      this.proposalResponses = responses;
      // TODO: check whether all responses from every peers are the same or not
      // TODO: check endorser's signature
      if (this.proposalResponses.errors.length > 0) {
        let errorMsg = 'Got errors from peers - ';
        this.proposalResponses.errors.forEach((error) => {
          errorMsg = `${errorMsg} ${error.message}`;
        });
        throw new Error(errorMsg);
      }
    } else {
      throw new Error('Proposal content not found. Please create proposal first');
    }
  }

  /**
   * @typedef {Object} QueryResults
   * @property {string} payload The response data returned by chaincode
   * @property {number} status status number.
   */

  /**
   * Get query results from endorsement responses
   * @returns {QueryResults} result
   */
  getQueryResults() {
    return this.proposalResponses.responses.map((response) => {
      const result = {
        payload: atob(response.response.payload),
        status: response.response.status,
      };
      return result;
    });
  }

  /**
   * Get unsigned transaction based on proposal and endorsements
   */
  async getUnsignedTransaction() {
    if (this.proposalPayload && this.proposalResponses) {
      const response = await this.ky.post('transaction/create', {
        json: {
          cert: this.certificate,
          channel: this.channel,
          chaincode: this.chaincode,
          mspid: this.mspid,
          proposal: {
            payload: this.proposalPayload,
          },
          responses: this.proposalResponses.responses,
        },
      }).json();
      this.transactionPayload = response.transaction;
    } else {
      throw new Error('Proposal content not found or responses not found. Please create proposal and get endorsements first');
    }
  }

  /**
   * Send signed transaction to given ordering service nodes
   * @param {Array<string>} targetOrderers Target ordering service node names
   */
  async sendSignedTransaction(targetOrderers) {
    if (this.transactionPayload) {
      const signature = await this.sign(this.transactionPayload);
      const response = await this.ky.post('transaction/send', {
        json: {
          channel: this.channel,
          chaincode: this.chaincode,
          transaction: {
            payload: this.transactionPayload,
            signature: {
              type: 'raw',
              value: signature,
            },
          },
          orderers: targetOrderers,
        },
      }).json();
      if (response.success === false) {
        throw new Error('Unable to send signed transaction to odering service');
      }
    } else {
      throw new Error('Transaction payload not found. Please create unsigned transaction first');
    }
  }

  /**
   * Get unsigned event service for subscribing to an event
   */
  async getUnsignedEventService() {
    const response = await this.ky.post('event/create', {
      json: {
        cert: this.certificate,
        channel: this.channel,
        chaincode: this.chaincode,
        mspid: this.mspid,
      },
    }).json();
    this.eventServicePayload = response.event;
  }

  /**
   * Send signed event service to server.
   * This will subscribe the service an listen to given listener
   * In order to listen to a transaction to be committed to the ledger,
   * please run this function before sending signed transaction.
   * @param {EventListener} listener Type of event listener with the ID of corresponding type
   * @param {Array<string>} targetPeers Target peer names
   */
  async sendSignedEventService(listener, targetPeers) {
    const signature = await this.sign(this.eventServicePayload);
    const response = await this.ky.post('event/send', {
      json: {
        channel: this.channel,
        chaincode: this.chaincode,
        event: {
          payload: this.eventServicePayload,
          signature: {
            type: 'raw',
            value: signature,
          },
        },
        listener,
        peers: targetPeers,
      },
    }).json();
    this.eventServiceStatus = response.status;
  }

  /**
   * Get event service status
   * @returns {EventServiceStatus} event service status
   */
  getEventServiceStatus() {
    return this.eventServiceStatus;
  }

  /**
   * Remove all data inside this instance
   */
  reset() {
    this.proposalPayload = null;
    this.proposalResponses = null;
    this.transactionId = null;
    this.transactionPayload = null;
    this.eventServicePayload = null;
    this.eventServiceStatus = null;
    this.fabricNodeNames = null;
  }
}

export default FabricHTTPClient;
