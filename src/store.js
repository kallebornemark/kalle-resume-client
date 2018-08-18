import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const getInitialRow = () => ({
  left: '',
  main: '',
  description: '',
  right: '',
  rightLinkURL: '',
  hidden: '',
});

export default new Vuex.Store({
  state: {
    token: null,
    isLoggedIn: false,
    sectionDialogIsVisible: false,
    currentSection: null,

    rowDialogIsVisible: false,
    currentRow: getInitialRow(),
    isNewRow: true,
  },

  mutations: {
    setToken(state, token) {
      const newState = state;
      newState.token = token;
      newState.isLoggedIn = !!newState.token;
    },

    toggleRowDialog(state, { index, rows, isNewRow = false }) {
      state.rowDialogIsVisible = !state.rowDialogIsVisible;
      state.currentRow = index !== undefined && rows !== undefined
        ? rows[index]
        : getInitialRow();
      state.isNewRow = isNewRow;
    },

    updateRow(state, { field, value }) {
      state.currentRow[field] = value;
    },
  },

  actions: {

  },
});
