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
  state: {
    credentials: {
      api_tags: {
        url: process.env.VUE_APP_URL_API_TAGS,
        user: process.env.VUE_APP_USER_API_TAGS,
        pass: process.env.VUE_APP_PASS_API_TAGS,
        token : localStorage.getItem("access_token")
      }
    },
  }
})
