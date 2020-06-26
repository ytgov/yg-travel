import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueHtmlToPaper from "vue-html-to-paper"

const options = {
  "name": "_blank",
  "specs": [
    "fullscreen=yes",
    "titlebar=yes",
    "scrollbars=yes"
  ]
}

Vue.use(VueHtmlToPaper, options);

console.log(`API Base: ${process.env.VUE_APP_API_BASE}`)
console.log(`App Base: ${process.env.APP_BASE}`)
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
