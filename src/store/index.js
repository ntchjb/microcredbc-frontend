import Vue from 'vue';
import Vuex from 'vuex';

import badge from './modules/badge';
import template from './modules/template';
import setting from './modules/setting';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    badge,
    template,
    setting,
  },
});
