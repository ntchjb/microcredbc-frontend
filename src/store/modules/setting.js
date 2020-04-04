import { profile } from '../../../tests/mockdata';

const states = {

};

const getters = {
  isIdentityExist() {
    // TODO: Check if x.509 and private key already loaded or not
    return true;
  },
  // TODO: return user role got from certificate
  role: () => 'consumer',
  // TODO: return user profile received from blockchain
  profile: () => profile,
};

const actions = {

};

const mutations = {

};

export default {
  namespaced: true,
  state: states,
  getters,
  actions,
  mutations,
};
