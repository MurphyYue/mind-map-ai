import Vue from 'vue';
import VueRouter from 'vue-router';
import MindMapPage from '../pages/mind-map/index.vue'; // 导入我们刚创建的页面组件
import GenerateStepPage from '../pages/generate-step/index.vue'; // 导入我们刚创建的页面组件

Vue.use(VueRouter);

const routes = [
  {
    path: '/mind-map',
    name: 'MindMapPage',
    component: MindMapPage
  },
  {
    path: '/generate-step',
    name: 'GenerateStepPage',
    component: GenerateStepPage
  },
  {
    path: '/', // 将根路径重定向到 /mind-map
    redirect: '/mind-map'
  }
  // 您可以在这里添加其他路由
];

const router = new VueRouter({
  mode: 'history', // 使用 history 模式，URL会更简洁 (例如 /mind-map 而不是 /#/mind-map)
  base: process.env.BASE_URL, // Vue CLI 项目的标准配置
  routes
});

export default router;