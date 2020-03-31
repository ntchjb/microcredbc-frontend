const states = {

};

const getters = {
  isIdentityExist() {
    // TODO: Check if x.509 and private key already loaded or not
    return true;
  },
  role() {
    // TODO: return user role got from certificate
    return 'issuer';
  },
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
