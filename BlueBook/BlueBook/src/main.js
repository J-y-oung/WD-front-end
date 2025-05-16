import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './utils/request'

const devToken = 'test_tokenliuqiba';
localStorage.setItem('token', devToken);
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
app.config.globalProperties.$http = axios