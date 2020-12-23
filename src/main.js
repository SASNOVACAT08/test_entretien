import Vue from "vue";
import VueApollo from "vue-apollo";
import App from "./App.vue";
import router from "./router";
import apolloClient from "./apollo";

import BaseButton from "./components/global/BaseButton";

Vue.config.productionTip = false;

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.component("base-button", BaseButton);

new Vue({
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
