import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const getInitialRow = () => ({
  category: null,
  content: null,
  description: null,
  timespan: null,
  linkText: null,
  linkURL: null,
  hidden: false
});

let store;

const initStore = () =>
  store ||
  (store = new Vuex.Store({
    state: {
      token: null,
      isLoggedIn: false,
      sectionDialogIsVisible: false,
      currentSection: null,

      rowDialogIsVisible: false,
      currentRow: getInitialRow(),
      isNewRow: true
    },

    mutations: {
      attemptToSetTokenFromLocalStorage(state) {
        const token = localStorage.getItem("token");
        if (token) {
          state.token = token;
          state.isLoggedIn = true;
        }
      },

      setToken(state, token) {
        const newState = state;
        newState.token = token;
        localStorage.setItem("token", token);
        newState.isLoggedIn = !!newState.token;
      },

      logout(state) {
        state.token = null;
        state.isLoggedIn = false;
        localStorage.removeItem("token");
      },

      toggleRowDialog(state, { section, index, rows, isNewRow = false }) {
        state.rowDialogIsVisible = !state.rowDialogIsVisible;
        state.currentRow =
          index !== undefined && rows !== undefined
            ? rows[index]
            : getInitialRow();
        state.currentSection = section;
        state.isNewRow = isNewRow;
      },

      updateRow(state, { field, value }) {
        state.currentRow[field] = value;
      }
    },

    actions: {}
  }));

export default initStore;
