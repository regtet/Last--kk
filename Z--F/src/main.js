import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ZqkButton from "./components/ZqkButton.vue";
Vue.config.productionTip = false;
Vue.component(ZqkButton.name, ZqkButton);
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");