import Vue from 'vue';
import Vuex from 'vuex';

import assertion from './modules/assertion';
import template from './modules/template';
import setting from './modules/setting';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    assertion,
    template,
    setting,
  },
});
