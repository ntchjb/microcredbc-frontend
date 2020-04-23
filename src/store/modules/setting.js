import db from '@/helper/idb';
import { keyPEMToJWK } from '@/helper/data';
import FabricHTTPClient from '@/helper/fabric-rest';

const states = {
  profile: {},
  privateKey: null,
  certificate: null,
};

const getters = {
  isIdentityExist: (state) => (state.privateKey !== null && state.certificate !== null),
  // TODO: return user role got from certificate
  role: (state) => state.profile.role,
  // TODO: return user profile received from blockchain
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
    // Create Fabric client to get profile information from blockchain
    const channel = process.env.VUE_APP_CHANNEL_NAME;
    const chaincode = process.env.VUE_APP_CHAINCODE_NAME;
    const mspid = process.env.VUE_APP_MSPID;
    const fabric = new FabricHTTPClient(
      certificatePEM,
      privateKeyObject,
      channel,
      chaincode,
      mspid,
    );

    const dbJobs = [];
    dbJobs.push(db.set('privateKey', privateKeyObject));
    dbJobs.push(db.set('certificate', certificatePEM));
    await Promise.all(dbJobs);

    commit('SET_PRIVATEKEY', privateKeyObject);
    commit('SET_CERTIFICATE', certificatePEM);
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

  async removeIdentity({ commit }) {
    const dbJobs = [];
    dbJobs.push(db.delete('privateKey'));
    dbJobs.push(db.delete('certificate'));
    await Promise.all(dbJobs);

    commit('REMOVE_CERTIFICATE');
    commit('REMOVE_PRIVATEKEY');
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
};

export default {
  namespaced: true,
  state: states,
  getters,
  actions,
  mutations,
};
