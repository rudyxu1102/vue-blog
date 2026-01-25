import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import filters from './utils/filters'
import './assets/css/index.scss'

const app = createApp(App)
const pinia = createPinia()

// 注册全局过滤器方法
app.config.globalProperties.$filters = filters

// 使用插件
app.use(pinia)
app.use(router)

// 挂载应用
app.mount('#app')
