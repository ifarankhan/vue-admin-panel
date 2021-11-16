import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import visitorLayout from "./views/layouts/VisitorLayout";
import mainLayout from "./views/layouts/MainLayout";

import "./css/main.css";
import i18n from "./i18n";

/* Collapse mobile aside menu on route change */
router.beforeEach((to) => {
  store.dispatch("asideMobileToggle", false);
  store.dispatch("asideLgToggle", false);
});

/* Default title tag */
const defaultDocumentTitle = "Psytech Distributor panel";

router.afterEach((to) => {
  /* Set document title from route meta */
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`;
  } else {
    document.title = defaultDocumentTitle;
  }

  /* Full screen mode */
  store.dispatch("fullScreenToggle", !!to.meta.fullScreen);

  /* Dark mode */
  // store.dispatch('darkMode')
});

const app = createApp(App).use(i18n);
app.component("visitorLayout", visitorLayout);
app.component("mainLayout", mainLayout);
app.use(store);
app.use(router);
app.mount("#app");
