import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: '',
    codeType: ''
  },

  getters: {
    getEmail: state => state.email,
  },

  mutations: {
    setEmail(state, email) {
      state.email = email;
    },

    setCodeType(state, type) {
      state.codeType = type;
    }
  }
});