import Vue from 'vue'
import App from './App.vue'
import Element from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import  router from './router/index'
import  axios from 'axios'
Vue.prototype.$http=axios

//导入富文本编辑器
import  mavonEditor from 'mavon-editor'
import  'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)



Vue.use(Element)
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
