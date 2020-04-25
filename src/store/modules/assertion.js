import db from '@/helper/idb';
import { fabricDefaultProperties, FabricHTTPClient } from '@/helper/fabric-rest';

const states = {
  /**
   Store list of assertions.
   {
     <badge assertion ID>: {
       ...<assertion key-value pairs>,
     },
     ...
   }
   */
  assertions: {},
};

const getters = {
  // TODO: Query from backend
  assertions: (state) => state.assertions,
  assertionInfo: (state) => (id) => {
    const assertion = state.assertions[id];
    const result = {
      recipient: assertion.recipient,
      badge: assertion.badge.id,
      issuedOn: assertion.issuedOn,
    };
    if (assertion.evidence) {
      result.evidence = assertion.evidence;
    }
    if (assertion.narrative) {
      result.narrative = assertion.narrative;
    }
    if (assertion.expires) {
      result.expires = assertion.expires;
    }
    return result;
  },
  /**
    Store list of assertions for each badge. This is used by issuers
    {
      <badge template ID>: [
        <assertion ID>
        ...
      ],
    }
   */
  badgeAssertions: (state) => {
    const result = {};
    Object.keys(state.assertions).forEach((assertionId) => {
      const badgeId = state.assertions[assertionId].badge.id;
      if (result[badgeId] === undefined) {
        result[badgeId] = [];
      }
      result[badgeId].push(assertionId);
    });
    return result;
  },
  assertionBadge: (state, thisGetters) => {
    const result = {};
    Object.keys(thisGetters.badgeAssertions).forEach((templateId) => {
      thisGetters.badgeAssertions[templateId].forEach((assertionId) => {
        result[assertionId] = templateId;
      });
    });
    return result;
  },
};

const actions = {
  createBadgeAssertions: async ({ rootState }, { assertionInfo, earnerMSPID }) => {
    const { channel, chaincode, mspid } = fabricDefaultProperties;
    const fabric = new FabricHTTPClient(
      rootState.setting.certificate,
      rootState.setting.privateKey,
      channel,
      chaincode,
      mspid,
    );
    const nodeNames = rootState.setting.fabricNetwork;
    await fabric.getUnsignedProposal('createCert', [], {
      assertion: JSON.stringify(assertionInfo),
      earnerMSPID,
    });
    const issuerPeers = nodeNames[channel].peers[mspid];
    await fabric.sendSignedProposal(issuerPeers);

    const assertionIdObj = fabric.getQueryResults();

    await fabric.getUnsignedTransaction();
    await fabric.getUnsignedEventService();
    const eventServicePromise = fabric.sendSignedEventService({
      type: 'transaction',
      id: fabric.getTransactionId(),
    }, issuerPeers);
    await fabric.sendSignedTransaction(nodeNames[channel].orderers);
    await eventServicePromise;
    if (fabric.checkEventServiceStatus() === false) {
      const status = fabric.getEventServiceStatus();
      throw new Error(`Unable to submit data to the ledger. The transaction at block ${status.block} has code ${status.code}`);
    }
    return assertionIdObj.id;
  },
  /**
   * This method is for issuer only
   */
  shareBadgeAssertionToEarner: async ({
    rootState,
  }, {
      assertionID,
      assertionInfo,
      earnerMSPID,
    }) => {
    const { channel, chaincode, mspid } = fabricDefaultProperties;
    const fabric = new FabricHTTPClient(
      rootState.setting.certificate,
      rootState.setting.privateKey,
      channel,
      chaincode,
      mspid,
    );
    const nodeNames = rootState.setting.fabricNetwork;
    await fabric.getUnsignedProposal('shareToEarner', [], {
      assertionID,
      assertion: JSON.stringify(assertionInfo),
      earnerMSPID,
    });
    const earnerPeers = nodeNames[channel].peers[earnerMSPID];
    await fabric.sendSignedProposal(earnerPeers);
    await fabric.getUnsignedTransaction();
    await fabric.getUnsignedEventService();
    const eventServicePromise = fabric.sendSignedEventService({
      type: 'transaction',
      id: fabric.getTransactionId(),
    }, earnerPeers);
    await fabric.sendSignedTransaction(nodeNames[channel].orderers);
    await eventServicePromise;
    if (fabric.checkEventServiceStatus() === false) {
      const status = fabric.getEventServiceStatus();
      throw new Error(`Unable to submit data to the ledger. The transaction at block ${status.block} has code ${status.code}`);
    }
  },
  /**
   * This method is for earners only
   */
  shareBadgeAssertion: async ({ rootState }, {
    assertionID,
    assertionInfo,
    targetMSPID,
  }) => {
    const { channel, chaincode, mspid } = fabricDefaultProperties;
    const fabric = new FabricHTTPClient(
      rootState.setting.certificate,
      rootState.setting.privateKey,
      channel,
      chaincode,
      mspid,
    );
    const nodeNames = rootState.setting.fabricNetwork;
    await fabric.getUnsignedProposal('shareCert', [], {
      assertionID,
      assertion: JSON.stringify(assertionInfo),
      targetOrg: targetMSPID,
    });
    const targetPeers = nodeNames[channel].peers[targetMSPID];
    await fabric.sendSignedProposal(targetPeers);
    await fabric.getUnsignedTransaction();
    await fabric.getUnsignedEventService();
    const eventServicePromise = fabric.sendSignedEventService({
      type: 'transaction',
      id: fabric.getTransactionId(),
    }, targetPeers);
    await fabric.sendSignedTransaction(nodeNames[channel].orderers);
    await eventServicePromise;
    if (fabric.checkEventServiceStatus() === false) {
      const status = fabric.getEventServiceStatus();
      throw new Error(`Unable to submit data to the ledger. The transaction at block ${status.block} has code ${status.code}`);
    }
  },
  getBadgeAssertions: async ({ commit, rootState }) => {
    const { channel, chaincode, mspid } = fabricDefaultProperties;
    const fabric = new FabricHTTPClient(
      rootState.setting.certificate,
      rootState.setting.privateKey,
      channel,
      chaincode,
      mspid,
    );
    const nodeNames = rootState.setting.fabricNetwork;
    await fabric.getUnsignedProposal('getCerts', []);
    await fabric.sendSignedProposal(nodeNames[channel].peers[mspid]);
    const assertions = fabric.getQueryResults();
    const processedAssertions = {};
    assertions.assertions.forEach((assertion) => {
      processedAssertions[assertion.id] = assertion;
    });
    await db.set('assertions', processedAssertions);
    commit('SET_BADGE_ASSERTIONS', processedAssertions);
  },
  revokeBadgeAssertions: async ({ commit, rootState }, { assertionId, reason }) => {
    const { channel, chaincode, mspid } = fabricDefaultProperties;
    const fabric = new FabricHTTPClient(
      rootState.setting.certificate,
      rootState.setting.privateKey,
      channel,
      chaincode,
      mspid,
    );
    const nodeNames = rootState.setting.fabricNetwork;
    await fabric.getUnsignedProposal('revokeCert', [
      assertionId,
      reason,
    ]);
    let allPeers = [];
    Object.keys(nodeNames[channel].peers).forEach((peerMspid) => {
      allPeers = allPeers.concat(nodeNames[channel].peers[peerMspid]);
    });
    await fabric.sendSignedProposal(allPeers);
    await fabric.getUnsignedTransaction();
    await fabric.getUnsignedEventService();
    const eventServicePromise = fabric.sendSignedEventService({
      type: 'transaction',
      id: fabric.getTransactionId(),
    }, allPeers);
    await fabric.sendSignedTransaction(nodeNames[channel].orderers);
    await eventServicePromise;
    if (fabric.checkEventServiceStatus() === false) {
      const status = fabric.getEventServiceStatus();
      throw new Error(`Unable to submit data to the ledger. The transaction at block ${status.block} has code ${status.code}`);
    } else {
      const assertions = await db.get('assertions');
      assertions[assertionId].revoked = true;
      assertions[assertionId].revocationReason = reason;
      await db.set('assertions', assertions);
      commit('SET_BADGE_ASSERTIONS', assertions);
    }
  },
  loadBadgeAssertions: async ({ commit }) => {
    const assertions = await db.get('assertions');
    if (assertions !== undefined) {
      commit('SET_BADGE_ASSERTIONS', assertions);
    }
  },
  clearBadgeAssertions: async ({ commit }) => {
    await db.delete('assertions');
    commit('REMOVE_BADGE_ASSERTIONS');
  },
};

const mutations = {
  SET_BADGE_ASSERTIONS(state, assertions) {
    state.assertions = assertions;
  },
  REMOVE_BADGE_ASSERTIONS(state) {
    state.assertions = {};
  },
};

export default {
  namespaced: true,
  state: states,
  getters,
  actions,
  mutations,
};
