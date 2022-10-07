import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store'
import './api/api.js'
import loading from './components/loading/loading.vue'
Vue.component('loading', loading)

Vue.prototype.$loading = (status) => {
  store.commit('changeLoading', status)
}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif