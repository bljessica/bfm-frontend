import Vue from 'vue'
import App from './App'
import * as API from '@/api/api.js'

Vue.config.productionTip = false
Vue.prototype.$api = API

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
