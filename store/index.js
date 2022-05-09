import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loading: true
  },
  mutations: {
    changeLoading(state, status) {
      state.loading = status || !state.loading
    }
  }
})
export default store