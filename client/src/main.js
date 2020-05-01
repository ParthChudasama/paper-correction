import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Spinner from "vue-spinkit";
import VueSocketIO from "vue-socket.io";
Vue.component("Spinner", Spinner);

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://127.0.0.1:5000",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;
// register globally
var VueScrollTo = require("vue-scrollto");
Vue.use(VueScrollTo);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
