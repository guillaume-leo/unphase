import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import quasarIconSet from "quasar/icon-set/mdi-v7";
import router from "@/router";

// Import icon libraries
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/mdi-v7/mdi-v7.css";

// Import Quasar css
import "quasar/src/css/index.sass";

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";

const pinia = createPinia();
const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  iconSet: quasarIconSet,
});

// Assumes you have a <div id="app"></div> in your index.html
myApp.use(router).use(pinia).mount("#app");
