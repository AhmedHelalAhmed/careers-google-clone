import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faAngleUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import "@/index.css";
import router from "@/routes";
import App from "@/App.vue";
import { createPinia } from "pinia";

library.add(faSearch);
library.add(faAngleDown);
library.add(faAngleUp);
const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
