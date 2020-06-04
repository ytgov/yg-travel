import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueHtmlToPaper from "vue-html-to-paper"

const printOptions = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css"
  ]
};

Vue.use(VueHtmlToPaper, printOptions);

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
