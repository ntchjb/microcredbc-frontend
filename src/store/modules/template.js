import { badgeClasses } from '../../../tests/mockdata';

// TODO: query from backend
const states = {
  badgeClasses,
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
