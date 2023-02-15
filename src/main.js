/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import router from '@/router/routes'
import vuetify from './plugins/vuetify'
// Components
import App from './App.vue'

//pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
//ens pinia

//sweet alert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//end sweet alert

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'




const app = createApp(App)
registerPlugins(app)
app.use(router)
app.use(pinia)
app.use(VueSweetalert2);
app.use(vuetify)
app.mount('#app')
