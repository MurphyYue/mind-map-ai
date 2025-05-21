<template>
  <div class="mind-map-page">
    <div class="mind-map">
      <MindMap :mindMapData="mindMapData" />
    </div>
    <div class="mind-ai">
      <ChatBot
        :initialData="externalData"
        @sync-to-mindmap="handleSyncToMindMap"
      />
    </div>
  </div>
</template>

<script>
import MindMap from "../../components/MindMap.vue";
import ChatBot from "../../components/ChatBot.vue";

export default {
  name: "MindMapPage",
  components: {
    MindMap,
    ChatBot,
  },
  data() {
    return {
      externalData: {},
      mindMapData: {},
    };
  },
  methods: {
    handleSyncToMindMap(data) {
      // 处理从ChatBot组件传来的数据
      this.mindMapData = data;
    },
    sendDataToChat(data) {
      // 此方法可以用于从 MindMap 或此页面上的其他交互向 ChatBot 发送数据
      this.externalData = data;
    },
  },
};
</script>

<style scoped lang="scss">
.mind-map-page {
  /* 您可以在此处添加页面特定的样式 */
  /* 例如，可以从 App.vue 复制相关样式（如果它们是作用域样式且在此处需要） */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  width: 100%;
  height: 100%;
  .mind-map {
    width: 70%;
  }
  .mind-ai {
    width: 30%;
  }
}
</style>
