import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'

import App from './App.vue'
import router from './router'

import './assets/scss/index.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig)

app.mount('#app')
