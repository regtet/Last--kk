import "./assets/one.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";

import { Button, Message, MessageBox } from "element-ui";

Message.install = function(Vue, options) {
    Vue.prototype.$message = Message;
};

Vue.use(Button);
Vue.use(Message);

Vue.prototype.$messageBox = MessageBox;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");