import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: window.sessionStorage.getItem("name")
  },
  mutations: {
    in(state) {
      state.name = window.sessionStorage.getItem("name");
    },
    clear(state) {
      state.name = "";
    }
  },
  actions: {},
  modules: {}
});
