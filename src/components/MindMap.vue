<template>
  <div class="ai-mind-wrap">
    <div class="mind-head"></div>
    <div id="jsmind_container" style="width: 100%; height: 100%"></div>
    <!-- <button @click="getMindData">保存脑图数据</button> -->
  </div>
</template>

<script>
import jsMind from "jsmind";
import "jsmind/style/jsmind.css";

export default {
  name: "MindMap",
  data() {
    return {
      jm: null,
      mindData: {
        meta: {
          name: "jsMind",
          author: "hizzgdev@163.com",
          version: "0.8.7",
        },
        format: "node_tree",
        data: {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      children: [
                        {
                          id: "7d6cc145-e0a4-4ad5-b6f7-27010eda4488",
                          topic: "需求登记",
                          createAble: true,
                        },
                      ],
                      id: "6f67b864-1798-442f-841f-b2b81cde41f6",
                      topic: "需求名称",
                    },
                    {
                      children: [
                        {
                          id: "af3bb087-2e3e-4d8c-92fd-b9952aa71f9d",
                          topic:
                            "需求列表页面显示项目信息，增加增删改限制条件。",
                          editable: true,
                        },
                      ],
                      id: "4de228f9-fc1a-462a-84ed-c4411f4c3fec",
                      topic: "需求描述",
                    },
                    {
                      children: [
                        {
                          id: "a9b3c5e2-0d3a-43e2-be66-a8af69ae9c79",
                          topic:
                            "1. 需求立项后，业技接收京征程立项结果回调，项目编号对应实施编号（实施编号改为项目编号），业务分析人员对应负责人。项目回调字段详见“立项结果回调”章节。\n2. 列表展示区/条件筛选区，增加“项目状态”，展示/检索京征程侧项目状态。\n3. 需求立项后，登记子需求功能按钮置灰不可使用，删除/批量删除按钮点击时弹窗提示用户。\n4. 以“是否有项目编号”标识项目是否立项。",
                        },
                      ],
                      id: "c71f7e41-d17c-4aff-8c0c-57356940808d",
                      topic: "业务规则",
                    },
                    {
                      children: [
                        {
                          children: [
                            {
                              children: [
                                {
                                  id: "4d07f2a5-9d98-4cfb-8fb2-242645e89289",
                                  topic:
                                    "验证需求模板登记时是否显示《数据标准执行记录表》上传入口",
                                },
                              ],
                              id: "5355ac4d-05b9-496d-bf48-d8e86e1551d2",
                              topic: "测试要点描述",
                            },
                            {
                              children: [
                                {
                                  children: [
                                    {
                                      children: [
                                        {
                                          id: "cea35e37-e195-4f60-99a9-eb421c50464d",
                                          topic: "需求登记",
                                        },
                                      ],
                                      id: "e38ef67b-f907-45e2-8ccb-a80314f17e79",
                                      topic: "功能名称",
                                    },
                                    {
                                      children: [
                                        {
                                          id: "d74bdf0b-e2cc-4765-b662-6d6fa08acb3c",
                                          topic: "场景测试法",
                                        },
                                      ],
                                      id: "ab7c9905-0d82-49ed-96cd-97c7116b1afd",
                                      topic: "测试方法",
                                    },
                                    {
                                      children: [
                                        {
                                          id: "31e6b433-071c-476d-a93c-948e14909215",
                                          topic:
                                            "验证在需求模板登记时是否正确显示《数据标准执行记录表》上传入口",
                                        },
                                      ],
                                      id: "ede92de8-0be6-4644-9a8c-e913ccb2f9d7",
                                      topic: "测试目的",
                                    },
                                    {
                                      children: [
                                        {
                                          id: "30588b15-4da7-4d9a-a4ba-e83a9e57d145",
                                          topic: "正例",
                                        },
                                      ],
                                      id: "e6f09f18-add1-45dd-95b6-c35732d32fe9",
                                      topic: "案例属性",
                                    },
                                    {
                                      children: [
                                        {
                                          id: "7cc7c9c0-68e2-498f-8427-3d3c630ae2b9",
                                          topic: "用户选择需求模板登记方式",
                                        },
                                      ],
                                      id: "8f180f3c-3df9-4014-8a91-5b36aab415a8",
                                      topic: "前置条件",
                                    },
                                    {
                                      children: [
                                        {
                                          id: "7b69dee4-ba9c-4e67-9513-9ccbc25244c8",
                                          topic: "需求模板登记页面",
                                        },
                                      ],
                                      id: "70701587-8cce-461e-bc1f-a9fa29334e02",
                                      topic: "数据要求",
                                    },
                                    {
                                      children: [
                                        {
                                          id: "d5cc9237-c13c-4109-9b1c-7e5030d04c21",
                                          topic: "高",
                                        },
                                      ],
                                      id: "da3dad55-5276-4d7e-a9dc-6b7bdfba272a",
                                      topic: "优先级",
                                    },
                                    {
                                      children: [
                                        {
                                          children: [
                                            {
                                              children: [
                                                {
                                                  id: "1bc7a936-e543-4728-bfca-d08432e09981",
                                                  topic: "进入需求模板登记页面",
                                                },
                                              ],
                                              id: "2d6511ad-80a9-42e1-8d2f-6d12a1248a7d",
                                              topic: "测试步骤描述",
                                            },
                                            {
                                              children: [
                                                {
                                                  id: "b9936a2a-4dfa-472e-84ee-c3b82ac492df",
                                                  topic:
                                                    "页面显示《数据标准执行记录表》上传入口",
                                                },
                                              ],
                                              id: "db650f02-4a9f-4f31-bcec-97e1139b2586",
                                              topic: "预期结果描述",
                                            },
                                          ],
                                          id: "315241ed-90af-49c5-bf33-78ac145e7dac",
                                          topic: "测试步骤1",
                                        },
                                        {
                                          children: [
                                            {
                                              children: [
                                                {
                                                  id: "8c5fe12e-df18-4f8e-9b7c-1230088c99b3",
                                                  topic: "进入某页面",
                                                },
                                              ],
                                              id: "414749ca-a1f0-42d8-a553-681bcd830a53",
                                              topic: "测试步骤描述",
                                            },
                                          ],
                                          id: "d657f0dc-bd99-477a-8fd1-359c8f76ad95",
                                          topic: "测试步骤2",
                                        },
                                      ],
                                      id: "0e851e58-55de-4f3e-82f9-56a8d1f28488",
                                      topic: "测试步骤",
                                    },
                                  ],
                                  id: "45478600-4193-4a80-94ed-6a073faf6afa",
                                  topic: "测试案例1",
                                },
                                {
                                  children: [
                                    {
                                      children: [
                                        {
                                          id: "c2bf11f8-9b2c-4706-8d7a-3fb4a0ea0ed4",
                                          topic: "需求登记",
                                        },
                                      ],
                                      id: "3b5cece5-667d-4d93-a4d1-2b4426e7285a",
                                      topic: "功能名称",
                                    },
                                  ],
                                  id: "d924a441-172f-406d-8857-f185a0001a9d",
                                  topic: "测试案例2",
                                },
                              ],
                              id: "b63b2526-77c6-47e3-aca3-d882b5df33ed",
                              topic: "测试案例",
                            },
                          ],
                          id: "d2938e3b-9e3f-4e48-910a-2b138a83ab79",
                          topic: "测试要点1",
                        },
                        {
                          children: [
                            {
                              children: [
                                {
                                  id: "f5976ec2-7752-4c50-b18a-7287b138a4a6",
                                  topic:
                                    "验证定稿时未上传《数据标准执行记录表》是否弹窗提示",
                                },
                              ],
                              id: "a223ef56-667f-4261-95d0-ef0860d4a6f3",
                              topic: "测试要点描述",
                            },
                          ],
                          id: "a8db4fb4-da6d-4af9-b27c-db902bd3d175",
                          topic: "测试要点2",
                        },
                      ],
                      id: "8e17dd5b-8614-4c82-adc5-e8ed5cbf26a3",
                      topic: "测试要点",
                    },
                  ],
                  id: "318d2070-d9ab-4e8b-931d-56d130781ab1",
                  topic: "需求条目1",
                },
                {
                  children: [
                    {
                      children: [
                        {
                          id: "6a68754f-d30e-45ca-8708-c8a110682603",
                          topic: "需求列表",
                        },
                      ],
                      id: "d6970038-25ed-46e4-a580-b42ba832ab7b",
                      topic: "需求名称",
                    },
                  ],
                  id: "3de4e7e3-0a7a-4f9e-a730-bd004734f2e9",
                  topic: "需求条目2",
                },
                {
                  children: [
                    {
                      children: [
                        {
                          id: "ab6b47fd-0322-4195-9ebd-bfb447d20089",
                          topic: "需求详情",
                        },
                      ],
                      id: "96a6a1b3-971e-4ad6-9e90-839e9a0fe0ab",
                      topic: "需求名称",
                    },
                  ],
                  id: "ff1608fe-a180-4186-8dbc-0a4c59e5aab9",
                  topic: "需求条目3",
                },
              ],
              id: "61451b7b-32e4-44ec-b458-47599622a6e6",
              topic: "需求条目",
            },
          ],
          id: "f1f43bd0-a3b5-4933-9087-e612a067e5b2",
          topic: "业技融合共创平台-需求文档.doc",
        },
      },
    };
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
      this.jm.show(this.mindData);
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
      alert("已打印脑图数据到控制台");
    },
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
  display: flex;
  .ai-container {
    width: 30%;
  }
}
/* 可以自定义右键菜单样式 */
</style>
