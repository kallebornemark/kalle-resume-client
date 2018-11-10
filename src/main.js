import Vue from 'vue';
import VueMq from 'vue-mq';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.use(VueMq, {
  breakpoints: {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200,
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
