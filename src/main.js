import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import axios from "axios";
// 挂载到vue原型链上
Vue.prototype.$http = axios;

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./assets/css/animate.css";

import router from "./router";
import store from "./store";
import "./assets/css/initialization.css";
import App from "./App.vue";

Vue.config.productionTip = false;

axios.interceptors.request.use(config => {
  NProgress.start();
  return config;
});

axios.interceptors.response.use(config => {
  NProgress.done();
  return config;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
