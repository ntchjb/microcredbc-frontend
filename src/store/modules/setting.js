import db from '@/helper/idb';
import { keyPEMToJWK } from '@/helper/data';
import { FabricHTTPClient, fabricDefaultProperties } from '@/helper/fabric-rest';

const states = {
  profile: null,
  privateKey: null,
  certificate: null,
};

const getters = {
  isIdentityExist: (state) => (state.privateKey !== null && state.certificate !== null),
  role: (state) => (state.profile === null ? '' : state.profile.role),
  profile: (state) => state.profile,
  certificate: (state) => state.certificate,
  privateKey: (state) => state.privateKey,
};

const actions = {
  async importIdentity({ commit }, { privateKeyPEM, certificatePEM }) {
    // Convert private key PEM into JWK
    const privateKey = await keyPEMToJWK(privateKeyPEM);
    let privateKeyObject = null;
    try {
      privateKeyObject = await window.crypto.subtle.importKey(
        'jwk',
        privateKey,
        {
          name: 'ECDSA',
          namedCurve: process.env.VUE_APP_SIGNING_NAMED_CURVE,
        },
        false,
        ['sign'],
      );
    } catch (err) {
      console.error('Unable to import private key', err);
    }

    const dbJobs = [];
    dbJobs.push(db.set('privateKey', privateKeyObject));
    dbJobs.push(db.set('certificate', certificatePEM));
    await Promise.all(dbJobs);

    commit('SET_PRIVATEKEY', privateKeyObject);
    commit('SET_CERTIFICATE', certificatePEM);
  },

  async getProfile({ commit, state }) {
    // Create Fabric client to get profile information from blockchain
    const { channel, chaincode, mspid } = fabricDefaultProperties;
    const fabric = new FabricHTTPClient(
      state.certificate,
      state.privateKey,
      channel,
      chaincode,
      mspid,
    );
    await fabric.loadFabricNodeNames();
    const nodeNames = fabric.getFabricNodeNames();
    await fabric.getUnsignedProposal('getProfile', []);
    await fabric.sendSignedProposal([...nodeNames[channel].peers[mspid]]);
    const profile = fabric.getQueryResults();
    if (profile) {
      await db.set('profile', profile);
      commit('SET_PROFILE', profile);
    } else {
      throw new Error('Profile not found in ledger');
    }
  },

  async setProfile({ state }, profileExtra = {}) {
    const { channel, chaincode, mspid } = fabricDefaultProperties;
    // Create Fabric client to get profile information from blockchain
    const fabric = new FabricHTTPClient(
      state.certificate,
      state.privateKey,
      channel,
      chaincode,
      mspid,
    );
    await fabric.loadFabricNodeNames();
    const nodeNames = fabric.getFabricNodeNames();
    const processedProfileExtra = profileExtra;
    Object.keys(processedProfileExtra).forEach((key) => {
      if (!processedProfileExtra[key]) {
        delete processedProfileExtra[key];
      }
    });
    const transientMap = {
      profile: JSON.stringify(processedProfileExtra),
    };
    await fabric.getUnsignedProposal('setProfile', [], transientMap);
    await fabric.sendSignedProposal([...nodeNames[channel].peers[mspid]]);
    await fabric.getUnsignedTransaction();
    await fabric.getUnsignedEventService();
    const eventServicePromise = fabric.sendSignedEventService({
      type: 'transaction',
      id: fabric.getTransactionId(),
    }, [...nodeNames[channel].peers[mspid]]);
    await fabric.sendSignedTransaction(nodeNames[channel].orderers);
    await eventServicePromise;
    return fabric.checkEventServiceStatus();
  },

  async setRevocationList({ state }) {
    const { channel, chaincode, mspid } = fabricDefaultProperties;
    // Create Fabric client to get profile information from blockchain
    const fabric = new FabricHTTPClient(
      state.certificate,
      state.privateKey,
      channel,
      chaincode,
      mspid,
    );
    await fabric.loadFabricNodeNames();
    const nodeNames = fabric.getFabricNodeNames();
    let allPeers = [];
    Object.keys(nodeNames[channel].peers).forEach((peerMspid) => {
      allPeers = allPeers.concat(nodeNames[channel].peers[peerMspid]);
    });
    await fabric.getUnsignedProposal('setRevocationList', []);
    await fabric.sendSignedProposal(allPeers);
    await fabric.getUnsignedTransaction();
    await fabric.getUnsignedEventService();
    const eventServicePromise = fabric.sendSignedEventService({
      type: 'transaction',
      id: fabric.getTransactionId(),
    }, allPeers);
    await fabric.sendSignedTransaction(nodeNames[channel].orderers);
    await eventServicePromise;
    return fabric.checkEventServiceStatus();
  },

  async loadIdentity({ commit }) {
    const dbJobs = [];
    dbJobs.push(db.get('privateKey'));
    dbJobs.push(db.get('certificate'));
    const keys = await Promise.all(dbJobs);
    if (keys.every((key) => key !== undefined)) {
      commit('SET_CERTIFICATE', keys[1]);
      commit('SET_PRIVATEKEY', keys[0]);
      return true;
    }
    return false;
  },

  async loadProfile({ commit }) {
    const profile = await db.get('profile');
    if (profile !== undefined) {
      commit('SET_PROFILE', profile);
      return true;
    }
    return false;
  },

  async removeIdentity({ commit }) {
    const dbJobs = [];
    dbJobs.push(db.delete('privateKey'));
    dbJobs.push(db.delete('certificate'));
    await Promise.all(dbJobs);

    commit('REMOVE_CERTIFICATE');
    commit('REMOVE_PRIVATEKEY');
  },

  async removeProfile({ commit }) {
    await db.delete('profile');
    commit('REMOVE_PROFILE');
  },
};

const mutations = {
  SET_CERTIFICATE(state, certificatePEM) {
    state.certificate = certificatePEM;
  },
  REMOVE_CERTIFICATE(state) {
    state.certificate = null;
  },
  SET_PRIVATEKEY(state, cryptoKey) {
    state.privateKey = cryptoKey;
  },
  REMOVE_PRIVATEKEY(state) {
    state.privateKey = null;
  },
  SET_PROFILE(state, profile) {
    state.profile = profile;
  },
  REMOVE_PROFILE(state) {
    state.profile = null;
  },
};

export default {
  namespaced: true,
  state: states,
  getters,
  actions,
  mutations,
};
