import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const getInitialRow = () => ({
  category: null,
  content: null,
  description: null,
  timespan: null,
  linkText: null,
  linkURL: null,
  hidden: false,
});

const initDarkMode = () => {
  const darkMode = JSON.parse(localStorage.getItem('darkMode'));
  setDarkMode(darkMode);
  return darkMode;
};

const setDarkMode = value => {
  document.documentElement.style.setProperty(
    '--bg-color',
    value ? '#22252a' : 'white'
  );
  document.documentElement.style.setProperty(
    '--text-color',
    value ? 'hsla(0,0%,100%,0.88)' : '#303030'
  );
  localStorage.setItem('darkMode', value);
};

let store;

const initStore = () =>
  store ||
  (store = new Vuex.Store({
    state: {
      token: null,
      isLoggedIn: false,

      introductionDialogIsVisible: false,
      introduction: null,

      rowDialogIsVisible: false,
      currentRow: getInitialRow(),
      isNewRow: true,

      sectionDialogIsVisible: false,
      currentSection: null,

      darkMode: initDarkMode(),
    },

    mutations: {
      attemptToSetTokenFromLocalStorage(state) {
        const token = localStorage.getItem('token');
        if (token) {
          state.token = token;
          state.isLoggedIn = true;
        }
      },

      setToken(state, token) {
        const newState = state;
        newState.token = token;
        localStorage.setItem('token', token);
        newState.isLoggedIn = !!newState.token;
      },

      logout(state) {
        state.token = null;
        state.isLoggedIn = false;
        localStorage.removeItem('token');
      },

      // Introduction
      toggleIntroductionDialog(state) {
        state.introductionDialogIsVisible = !state.introductionDialogIsVisible;
      },

      setIntroduction(state, newIntroduction) {
        state.introduction = newIntroduction;
      },

      // Section
      toggleSectionDialog(state, { section }) {
        state.sectionDialogIsVisible = !state.sectionDialogIsVisible;
        state.currentSection = section;
      },

      // Rows
      toggleRowDialog(state, { section, index, rows, isNewRow = false }) {
        state.rowDialogIsVisible = !state.rowDialogIsVisible;
        state.currentRow =
          index !== undefined && rows !== undefined
            ? rows[index]
            : getInitialRow();
        state.currentSection = section;
        state.isNewRow = isNewRow;
      },

      toggleDarkMode(state) {
        const newValue = !state.darkMode;
        state.darkMode = newValue;
        setDarkMode(newValue);
      },
    },

    actions: {},
  }));

export default initStore;
