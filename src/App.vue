<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
  // 之前在这里的 MindMap 和 ChatBot 组件的导入、注册、data 和 methods
  // 已经移动到 src/pages/mind-map/index.vue 中了
}
</script>

<style>
/* 全局样式可以保留在这里 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
