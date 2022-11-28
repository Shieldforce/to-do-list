import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import tags from "./modules/tags/index";
import tasks from "./modules/tasks/index";

export default new Vuex.Store({
  modules: {
    tags,
    tasks,
  },
  state: {},
  actions: {},
  getters: {},
  mutations: {},
})
