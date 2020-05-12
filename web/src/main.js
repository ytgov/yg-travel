import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'


console.log(`API Base: ${process.env.VUE_APP_API_BASE}`)
Vue.config.productionTip = false
Vue.use({
    install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: process.env.VUE_APP_API_BASE
    })
  }
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
