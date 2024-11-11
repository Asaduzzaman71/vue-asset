import { createApp, markRaw } from 'vue'
import App from './App.vue'
import Router from './router'
import { createPinia } from 'pinia'
const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(Router)
})
createApp(App).use(pinia).use(Router).mount('#app')
