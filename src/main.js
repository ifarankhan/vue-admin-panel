import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import visitorLayout from './views/layouts/VisitorLayout'
import mainLayout from './views/layouts/MainLayout'
import PrimeVue from 'primevue/config'; 
import VueClickAway from "vue3-click-away";

import 'primevue/resources/themes/lara-light-indigo/theme.css';       //theme
import 'primevue/resources/primevue.min.css';                 //core css
import 'primeicons/primeicons.css';

import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'

import './css/main.css'
import i18n from './i18n'
store.dispatch("auth/localStorageDataAction")


/* Collapse mobile aside menu on route change */
router.beforeEach(to => {
  store.dispatch('asideMobileToggle', false)
  store.dispatch('asideLgToggle', false)
})

const app = createApp(App)
app.use(i18n)
app.use(PrimeVue)
app.use(VueClickAway)
app.component('Datepicker', Datepicker);
app.component('visitorLayout', visitorLayout)
app.component('mainLayout', mainLayout)
app.use(store)
app.use(router)
app.mount('#app')
