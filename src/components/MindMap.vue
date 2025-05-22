<template>
  <div class="ai-mind-wrap">
    <div class="mind-head">
      <div>{{ title }}</div>
      <div class="button-container">
        <div @click="startEdit" class="mind-btn">AI智能修改</div>
        <div @click="getMindData" class="mind-btn">保存脑图数据</div>
      </div>
    </div>
    <div id="jsmind_container" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import jsMind from "jsmind";
import "jsmind/style/jsmind.css";

export default {
  name: "MindMap",
  props: {
    title: {
      type: String,
      default: "测试要点",
    },
    mindMapData: {
      type: Object,
      default: () => ({
        meta: {
          name: "jsMind",
          author: "bobfintech",
          version: "0.0.1",
        },
        format: "node_tree",
        data: {
          
        }
      })
    },
    editedNodeData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      jm: null,
    };
  },
  watch: {
    editedNodeData: {
      handler(newVal) {
        console.log(newVal);
        if (newVal && newVal.id) {
          this.jm.update_node(newVal.id, newVal.content);
          // this.jm.disable_edit();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.initMind();
    this.registerContextMenu();
  },
  methods: {
    initMind() {
      // 初始化脑图
      this.jm = new jsMind({
        container: "jsmind_container",
        hasChildren: true,
        view: { line_width: 2, line_color: "#555" },
        theme: "primary",
        editable: true,
      });
      this.jm.show(this.mindMapData);
    },
    registerContextMenu() {
      // 自定义右键菜单
      const container = document.getElementById("jsmind_container");
      container.oncontextmenu = (e) => {
        e.preventDefault();
        // 获取点击坐标
        const x = e.clientX,
          y = e.clientY;
        // 获取当前选中节点
        const selectedNode = this.jm.get_selected_node();
        if (!selectedNode) return;
        // 如果节点可新增子节点，则显示菜单
        if (
          selectedNode &&
          (selectedNode.data.createAble || selectedNode.data.editable)
        ) {
          this.showContextMenu(x, y);
        }
      };
      // 点击空白处关闭菜单
      document.addEventListener("click", this.hideContextMenu);
    },
    showContextMenu(x, y) {
      // 创建菜单
      this.hideContextMenu(); // 保证只有一个菜单
      const menu = document.createElement("div");
      menu.id = "mind-context-menu";
      menu.style.position = "fixed";
      menu.style.left = x + "px";
      menu.style.top = y + "px";
      menu.style.background = "#fff";
      menu.style.border = "1px solid #bbb";
      menu.style.zIndex = 9999;
      menu.style.padding = "4px 0";
      menu.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
      // 新增子节点按钮
      const addBtn = document.createElement("div");
      addBtn.innerText = "新增子节点";
      addBtn.style.padding = "4px 16px";
      addBtn.style.cursor = "pointer";
      addBtn.onmouseenter = () => (addBtn.style.background = "#eee");
      addBtn.onmouseleave = () => (addBtn.style.background = "");
      addBtn.onclick = () => {
        this.addChildNode();
        this.hideContextMenu();
      };
      menu.appendChild(addBtn);
      // 编辑节点按钮
      const editBtn = document.createElement("div");
      editBtn.innerText = "编辑节点";
      editBtn.style.padding = "4px 16px";
      editBtn.style.cursor = "pointer";
      editBtn.onmouseenter = () => (editBtn.style.background = "#eee");
      editBtn.onmouseleave = () => (editBtn.style.background = "");
      editBtn.onclick = () => {
        this.editNode();
        this.hideContextMenu();
      };
      menu.appendChild(editBtn);
      document.body.appendChild(menu);
    },
    hideContextMenu() {
      const menu = document.getElementById("mind-context-menu");
      if (menu) menu.remove();
    },
    addChildNode() {
      const selected = this.jm.get_selected_node();
      console.log(selected);
      if (!selected) return;
      if (!selected || !selected.data.createAble) {
        alert("该节点不可新增子节点");
        return;
      }
      this.jm.enable_edit();
      // 弹窗输入新节点名称
      const topic = prompt("请输入新节点名称");
      if (!topic) return;
      // 生成唯一ID
      const nodeId = "node_" + Date.now();
      // 这里默认新节点仍可编辑，你可根据实际需求定制
      this.jm.add_node(selected, nodeId, topic, { createAble: true });
      this.jm.disable_edit();
    },
    editNode() {
      const selected = this.jm.get_selected_node();
      console.log(selected);
      if (!selected) return;
      if (!selected || !selected.data.editable) {
        alert("该节点不可编辑");
        return;
      }
      this.jm.enable_edit();
    },
    getMindData() {
      // 获取当前脑图全部数据，可用于传给后端
      const data = this.jm.get_data("node_array");
      // 可直接传 data 到后端（如 axios.post(..., data)）
      console.log("当前脑图数据：", data);
    },
    startEdit() {
      const nodeData = this.jm.get_selected_node()
      console.log(nodeData);
      this.$emit('startEdit', nodeData)
    }
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideContextMenu);
  },
};
</script>

<style scoped lang="scss">
.ai-mind-wrap {
  width: 100%;
  height: calc(100vh - 100px);
  .mind-head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    .button-container {
     display: flex;
     gap: 10px;
     .mind-btn {
      cursor: pointer;
      padding: 5px 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f5f5f5;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: #e5e5e5;
      }
     }
    }
  }
}
</style>
