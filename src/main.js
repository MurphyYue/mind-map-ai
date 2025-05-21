import Vue from 'vue'
import App from './App.vue'
import router from './router' // 1. 导入路由配置

Vue.config.productionTip = false

new Vue({
  router, // 2. 将 router 实例注入到 Vue 根实例中
  render: h => h(App),
}).$mount('#app')
