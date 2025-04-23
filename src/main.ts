import '@/assets/styles/main.css'
import '@arco-design/web-vue/dist/arco.css'
import ArcoVue from '@arco-design/web-vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.mount('#app')
