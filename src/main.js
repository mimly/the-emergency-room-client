import Vue from "vue";
import VueScrollTo from "vue-scrollto";
import debug from "debug";
import io from "socket.io-client";
import { BootstrapVue } from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(VueScrollTo);

Vue.config.productionTip = false;

localStorage.debug = "emergency-room";

// multiple connections over one socket (multiplexing)
new Vue({
  data: {
    debug: debug("emergency-room"),
    authSocket: io("/auth", {
      transports: ["websocket"],
      reconnection: false // do not reconnect automatically
    }).connect(),
    apiSocket: io("/api", {
      transports: ["websocket"],
      reconnection: false // do not reconnect automatically
    }).connect()
  },
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
