import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createProPlugin, inputs } from '@formkit/pro'
import '@formkit/pro/genesis'
import './assets/scss/index.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const pro = createProPlugin(import.meta.env.VITE_FORMKIT_PRO_API_KEY, inputs)
library.add(faMoon, faSun)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(autoAnimatePlugin)
app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig({ plugins: [pro] }))

app.mount('#app')
