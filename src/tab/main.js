import { createApp } from 'vue'
import App from './components/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)//可以在这里传入element+的全局配置对象
app.mount('#main-view')