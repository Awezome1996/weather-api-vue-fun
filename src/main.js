import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import VueGeolocation from 'vue-browser-geolocation';
Vue.use(VueGeolocation);

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
new Vue({
  render: h => h(App),
}).$mount('#app')
