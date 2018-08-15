import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    isLoggedIn: false,
    addEntryDialogIsVisible: false,
    currentSection: null,
  },

  mutations: {
    setToken(state, token) {
      const newState = state;
      newState.token = token;
      newState.isLoggedIn = !!newState.token;
    },

    openAddSectionDialog(state, section) {
      const newState = state;
      newState.addEntryDialogIsVisible = true;
      newState.currentSection = section;
    },

    closeAddSectionDialog(state) {
      const newState = state;
      newState.addEntryDialogIsVisible = false;
    },
  },

  actions: {

  },
});
