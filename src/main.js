import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import httpAxios from './plugins/axios'
import httpAxiosApiTags from './plugins/axiosApiTags'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  httpAxios,
  httpAxiosApiTags,
  render: h => h(App)
}).$mount('#app')
