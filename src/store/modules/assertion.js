import { badgeAssertions, assertions } from '../../../tests/mockdata';

const states = {
  /**
    Store list of assertions for each badge. This is used by issuers
    {
      <badge template ID>: [
        <assertion ID>
        ...
      ],
    }
   */
  badgeAssertions: {},

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
  assertions: () => assertions,
  badgeAssertions: () => badgeAssertions,
  assertionBadge: (state) => {
    const result = {};
    Object.keys(state.badgeAssertions).forEach((templateId) => {
      state.badgeAssertions[templateId].forEach((assertionId) => {
        result[assertionId] = templateId;
      });
    });
    return result;
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
