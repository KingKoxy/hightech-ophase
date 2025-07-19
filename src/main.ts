import './assets/main.css'
import './assets/icons.css'

import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import { setupApolloClient } from '@/client.ts'

const app = createApp(App)

setupApolloClient()
app.use(router)

await router.isReady()
app.mount('#app')
