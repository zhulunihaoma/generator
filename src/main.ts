import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import './assets/icon/designerFont/iconfont.css';
import 'element-plus/dist/index.css'
createApp(App).use(ElementPlus).mount('#app')

// 1.我们先自己构造一些假数据 能实现根据位置渲染内容
// 配置组件之间的映射关系 {preview:xxx, render:xxx}