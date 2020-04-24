import db from '@/helper/idb';
import { fabricDefaultProperties, FabricHTTPClient } from '@/helper/fabric-rest';

const states = {
  badgeClasses: [],
};

const getters = {
  badgeClassObject: (state) => {
    const result = {};
    state.badgeClasses.forEach((badgeClass) => {
      result[badgeClass.id] = badgeClass;
    });
    return result;
  },
  badgeClassArray: (state) => state.badgeClasses,
};

const actions = {
  loadBadgeTemplates: async ({ commit }) => {
    const templates = await db.get('templates');
    if (templates !== undefined) {
      commit('SET_BADGE_TEMPLATES', templates);
    }
  },
  getBadgeTemplates: async ({ commit, rootState }) => {
    const { channel, chaincode, mspid } = fabricDefaultProperties;
    const fabric = new FabricHTTPClient(
      rootState.setting.certificate,
      rootState.setting.privateKey,
      channel,
      chaincode,
      mspid,
    );
    await fabric.loadFabricNodeNames();
    const nodeNames = fabric.getFabricNodeNames();
    await fabric.getUnsignedProposal('getSubmitterTemplates', []);
    let allPeers = [];
    Object.keys(nodeNames[channel].peers).forEach((peerMspid) => {
      allPeers = allPeers.concat(nodeNames[channel].peers[peerMspid]);
    });
    await fabric.sendSignedProposal(allPeers);
    const badgeTemplates = fabric.getQueryResults();
    await db.set('templates', badgeTemplates.badges);
    commit('SET_BADGE_TEMPLATES', badgeTemplates.badges);
  },

  createBadgeTemplate: async ({ rootState }, badgeTemplate) => {
    const { channel, chaincode, mspid } = fabricDefaultProperties;
    const fabric = new FabricHTTPClient(
      rootState.setting.certificate,
      rootState.setting.privateKey,
      channel,
      chaincode,
      mspid,
    );
    await fabric.loadFabricNodeNames();
    const nodeNames = fabric.getFabricNodeNames();
    const badgeTemplateString = JSON.stringify(badgeTemplate);
    await fabric.getUnsignedProposal('createTemplate', [
      badgeTemplateString,
    ], {
      profile: JSON.stringify(rootState.setting.profile),
    });
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
    }
  },
  archiveBadgeTemplate: async ({ commit, rootState }, badgeId) => {
    const { channel, chaincode, mspid } = fabricDefaultProperties;
    const fabric = new FabricHTTPClient(
      rootState.setting.certificate,
      rootState.setting.privateKey,
      channel,
      chaincode,
      mspid,
    );
    await fabric.loadFabricNodeNames();
    const nodeNames = fabric.getFabricNodeNames();
    await fabric.getUnsignedProposal('archiveTemplate', [
      badgeId,
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
      const templates = await db.get('templates');
      const index = templates.findIndex((badgeClass) => badgeClass.id === badgeId);
      templates[index].archived = true;
      await db.set('templates', templates);
      commit('SET_BADGE_TEMPLATES', templates);
    }
  },
  clearBadgeTemplates: async ({ commit }) => {
    await db.delete('templates');
    commit('REMOVE_BADGE_TEMPLATES');
  },
};

const mutations = {
  SET_BADGE_TEMPLATES(state, badgeClasses) {
    state.badgeClasses = badgeClasses;
  },
  REMOVE_BADGE_TEMPLATES(state) {
    state.badgeClasses = [];
  },
};

export default {
  namespaced: true,
  state: states,
  getters,
  actions,
  mutations,
};
