import App from './App.vue';
import Vue from 'vue';
import VueMq from 'vue-mq';
import ElementUI from 'element-ui';
import store from './store';

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
  store,
  render: h => h(App),
}).$mount('#app');
