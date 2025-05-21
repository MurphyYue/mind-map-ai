<template>
  <div class="mind-map-page">
    <div class="mind-map">
      <MindMap :mindMapData="mindMapData" @startEdit="sendDataToChat" :editedNodeData="editedNodeData" />
    </div>
    <div class="mind-ai">
      <ChatBot
        :editingNodeData="editingNodeData"
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
      editingNodeData: {},
      editedNodeData: {},
      mindMapData: {
        data: {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      children: [
                        {
                          id: "a8e553c6-5252-4f9f-b10c-03c8e0ba928e",
                          topic:
                            "确保系统正确识别并阻止有效合约账户的降级操作|POSITIVE|有效合约账户信息|账户存在有效合约|HIGH|SCENARIO",
                        },
                        {
                          id: "56e6c0cd-6196-4f86-adec-c140b15024c2",
                          topic:
                            "确保系统允许无合约账户的正常降级操作|NEGATIVE|无合约账户信息|账户无有效合约|MEDIUM|SCENARIO",
                        },
                        {
                          id: "155fbed6-fbee-4a50-aa85-99a528bafe6b",
                          topic:
                            "确保系统正确识别并阻止有XX合约账户的销卡操作|POSITIVE|XX合约账户信息|账户存在XX合约|HIGH|SCENARIO",
                        },
                        {
                          id: "447fa857-e695-42b1-9773-b9db55035dea",
                          topic:
                            "确保系统允许无XX合约账户的正常销卡操作|NEGATIVE|无XX合约账户信息|账户无XX合约|MEDIUM|SCENARIO",
                        },
                        {
                          id: "c42dadf7-422b-4207-b814-ef66cf1411dd",
                          topic:
                            "确保系统正确识别并阻止有XX合约账户的换卡操作|POSITIVE|XX合约账户信息|账户存在XX合约|HIGH|SCENARIO",
                        },
                        {
                          id: "baeaa93e-1e49-4f0a-b5ea-9ca5e0d3d323",
                          topic:
                            "确保系统允许无XX合约账户的正常换卡操作|NEGATIVE|无XX合约账户信息|账户无XX合约|MEDIUM|SCENARIO",
                        },
                      ],
                      id: "2bca35f6-1416-43d4-968d-5dff899a9346",
                      topic: "验证存在有效合约的账户不允许降级为二类账户",
                    },
                  ],
                  dataAttrName: "reqDesc",
                  dataContent: "业务功能详述1。",
                  id: "224d6590-0c21-4a21-9203-e9e2cefa8592",
                  topic: "业务功能详述",
                },
                {
                  dataAttrName: "bizDesc",
                  dataContent:
                    "（1）存在有效合约的账户不允许做降级为二类账户（柜面、Pad渠道账户升降级交易应进行控制并给予提示）。\n（2）如有XX合约，不让进行销卡、换卡操作。",
                  id: "cbdae32a-b61b-42db-bf20-646fc77dc098",
                  topic: "业务规则",
                },
                {
                  dataAttrName: "bizProcess",
                  dataContent:
                    "从客户或内部用户角度，描述业务发起至结束的完整的业务处理流程和实现的功能，描述清楚业务的操作步骤，可绘制流程图。（注意：业务流程概述从整体流程上宏观说明）。例如：1、客户通过工资保障支付系统发放农民工工资步骤：    （1）查询账户信息；    （2）提交批量代发申请；    （3）预留手机号接收短信确认；2、完成批量代发后，提供查询接口：    （1）查询代发工资明细状态，调用代发工资结果查询接口；    （2）查询账户余额，调用账户余额查询接口；    （3）查询单个账户指定日期所有交易数据，调用账户交易记录查询接口；3、业务流程图。例如：申请入池托管票据（票据池产品）​&#0;&#0;&#0;&#0;&#0;标题 双击可键入注释。再选择“标题”可编辑该标题。 提交票据托管申请【填入该操作员的角色。例如，用户】录入票据信息【填入该操作员的角色。例如，柜员】票据入库保管【填入该操作员的角色。例如，柜员、大堂经理】验查票据，是否可托管【填入该操作员的角色。例如，柜员】复核票据信息是否与票面一致【填入该操作员的角色。例如，柜员、大堂经理】柜面渠道申请入池托管票据（票据池产品）是是假票、瑕疵票等否信息录入错误​",
                  id: "4b7e4334-a1a3-46bd-b5b8-25bc9191249b",
                  topic: "业务流程",
                },
                {
                  dataAttrName: "inOutput",
                  dataContent:
                    "| 序号 | 要素分类 | 字段名称 | 是否必填 | 枚举值 | 备注 |\n|------|----------|----------|----------|--------|------|\n| 1    | 输入要素 | a        | 是       |        |      |\n|      |          | b        | 否       |        |      |\n| 2    | 输出要素 | c        | 是       |        |      |",
                  id: "df3c6099-2c50-4266-8a53-8715caae0f58",
                  topic: "输入和输出",
                },
              ],
              dataAttrName: "reqName",
              id: "71f756af-b809-4c0e-a916-24f5acec515b",
              topic: "业务功能一：XXX",
            },
            {
              children: [
                {
                  dataAttrName: "reqDesc",
                  dataContent: "业务功能详述2。",
                  id: "079aa701-71cd-4c5f-83aa-c38e21beda3f",
                  topic: "业务功能详述",
                },
                {
                  dataAttrName: "bizDesc",
                  dataContent:
                    "（1）存在有效合约的账户不允许做降级为二类账户（柜面、Pad渠道账户升降级交易应进行控制并给予提示）。\n（2）如有XX合约，不让进行销卡、换卡操作。",
                  id: "b162e58d-9480-4d97-b13d-00b09d396702",
                  topic: "业务规则",
                },
                {
                  dataAttrName: "bizProcess",
                  dataContent:
                    "从客户或内部用户角度，描述业务发起至结束的完整的业务处理流程和实现的功能，描述清楚业务的操作步骤，可绘制流程图。（注意：业务流程概述从整体流程上宏观说明）。例如：1、客户通过工资保障支付系统发放农民工工资步骤：    （1）查询账户信息；    （2）提交批量代发申请；    （3）预留手机号接收短信确认；2、完成批量代发后，提供查询接口：    （1）查询代发工资明细状态，调用代发工资结果查询接口；    （2）查询账户余额，调用账户余额查询接口；    （3）查询单个账户指定日期所有交易数据，调用账户交易记录查询接口；3、业务流程图。例如：申请入池托管票据（票据池产品）​&#0;&#0;&#0;&#0;&#0;标题 双击可键入注释。再选择“标题”可编辑该标题。 提交票据托管申请【填入该操作员的角色。例如，用户】录入票据信息【填入该操作员的角色。例如，柜员】票据入库保管【填入该操作员的角色。例如，柜员、大堂经理】验查票据，是否可托管【填入该操作员的角色。例如，柜员】复核票据信息是否与票面一致【填入该操作员的角色。例如，柜员、大堂经理】柜面渠道申请入池托管票据（票据池产品）是是假票、瑕疵票等否信息录入错误​",
                  id: "3b25a660-d5b8-4789-83e5-698008f93a2a",
                  topic: "业务流程",
                },
                {
                  dataAttrName: "inOutput",
                  dataContent:
                    "| 序号 | 要素分类 | 字段名称 | 是否必填 | 枚举值 | 备注 |\n|------|----------|----------|----------|--------|------|\n| 1    | 输入要素 |          |          |        |      |\n| 2    | 输出要素 |          |          |        |      |",
                  id: "8545edfe-3abf-4e65-b19e-9342a62c548c",
                  topic: "输入和输出",
                },
              ],
              dataAttrName: "reqName",
              id: "ae78cf66-5518-47c9-ad03-c07d9bb42925",
              topic: "业务功能二:XXX",
            },
            {
              children: [
                {
                  dataAttrName: "reqDesc",
                  dataContent: "业务功能详述3。",
                  id: "93787646-cb53-4f03-8a4a-24f4ac3772ef",
                  topic: "业务功能详述",
                },
                {
                  dataAttrName: "bizDesc",
                  dataContent:
                    "（1）存在有效合约的账户不允许做降级为二类账户（柜面、Pad渠道账户升降级交易应进行控制并给予提示）。\n（2）如有XX合约，不让进行销卡、换卡操作。",
                  id: "58803630-75e9-4947-a7b5-53c17d77b4e2",
                  topic: "业务规则",
                },
                {
                  dataAttrName: "bizProcess",
                  dataContent:
                    "从客户或内部用户角度，描述业务发起至结束的完整的业务处理流程和实现的功能，描述清楚业务的操作步骤，可绘制流程图。（注意：业务流程概述从整体流程上宏观说明）。例如：1、客户通过工资保障支付系统发放农民工工资步骤：    （1）查询账户信息；    （2）提交批量代发申请；    （3）预留手机号接收短信确认；2、完成批量代发后，提供查询接口：    （1）查询代发工资明细状态，调用代发工资结果查询接口；    （2）查询账户余额，调用账户余额查询接口；    （3）查询单个账户指定日期所有交易数据，调用账户交易记录查询接口；3、业务流程图。例如：申请入池托管票据（票据池产品）​&#0;&#0;&#0;&#0;&#0;标题 双击可键入注释。再选择“标题”可编辑该标题。 提交票据托管申请【填入该操作员的角色。例如，用户】录入票据信息【填入该操作员的角色。例如，柜员】票据入库保管【填入该操作员的角色。例如，柜员、大堂经理】验查票据，是否可托管【填入该操作员的角色。例如，柜员】复核票据信息是否与票面一致【填入该操作员的角色。例如，柜员、大堂经理】柜面渠道申请入池托管票据（票据池产品）是是假票、瑕疵票等否信息录入错误​",
                  id: "92a38376-983c-46f6-b0fd-b4181870213d",
                  topic: "业务流程",
                },
                {
                  dataAttrName: "inOutput",
                  dataContent:
                    "| 序号 | 要素分类 | 字段名称 | 是否必填 | 枚举值 | 备注 |\n|------|----------|----------|----------|--------|------|\n| 1    | 输入要素 |          |          |        |      |\n| 2    | 输出要素 |          |          |        |      |",
                  id: "b49ae3a6-f13a-4c9a-bac0-5e330971a907",
                  topic: "输入和输出",
                },
              ],
              dataAttrName: "reqName",
              id: "ae1972fe-7344-4637-a297-6ba7f3d68840",
              topic: "业务功能二:XXX",
            },
          ],
          dataAttrName: "daocName",
          id: "af724dbb-c322-4a51-ad0b-90fe07710320",
          topic: "23432",
        },
        format: "node_tree",
        meta: { author: "123", name: "2343", version: "1.1.1" },
      },
    };
  },
  methods: {
    handleSyncToMindMap(data) {
      // 处理从ChatBot组件传来的数据
      this.editedNodeData = data;
    },
    sendDataToChat(data) {
      // 此方法可以用于从 MindMap 或此页面上的其他交互向 ChatBot 发送数据
      this.editingNodeData = data;
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
