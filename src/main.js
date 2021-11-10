import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import visitorLayout from './views/layouts/VisitorLayout'

import './css/main.css'

/* Default title tag */
const defaultDocumentTitle = 'Psytech Distributor panel'

const app = createApp(App)
app.component('visitorLayout', visitorLayout)
app.use(store)
app.use(router)
app.mount('#app')
