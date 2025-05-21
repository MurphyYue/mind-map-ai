<template>
  <div class="analysis-status-page">
    <h1>分诊状态</h1>
    <div class="steps-container">
      <div
        v-for="step in steps"
        :key="step.id"
        class="step-item"
        :class="{
          completed: step.status === 'completed',
          'in-progress': step.status === 'in-progress',
          pending: step.status === 'pending',
        }"
      >
        <span class="step-icon-prefix">{{ step.prefixIcon }}</span>
        <span class="step-text">{{ step.text }}</span>
        <span class="step-status-icon">
          <template v-if="step.status === 'completed'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="green"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-check-circle"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </template>
          <template v-else-if="step.status === 'in-progress'">
            <div class="spinner"></div>
          </template>
        </span>
      </div>
    </div>
    <div v-if="!allStepsCompleted" class="info-message">
      <span class="info-icon">ℹ️</span>
      您可以先处理其他工作, 无需等待。分析完成后我们会及时通知您。
    </div>
    <div v-if="allStepsCompleted" class="info-message completion-message">
      <span class="info-icon">🎉</span>
      所有步骤已完成！
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
// 模拟API的端点
// const MOCK_API_URL = "/api/getAnalysisStatus"; // 您需要替换为真实的API端点

export default {
  name: "AnalysisStatusPage",
  data() {
    return {
      steps: [
        { id: 1, prefixIcon: "📄", text: "1. 分析需求条目一, 生成测试要点", status: "pending" },
        { id: 2, prefixIcon: "📊", text: "2. 分析需求条目二, 生成测试要点", status: "pending" },
        { id: 3, prefixIcon: "☑️", text: "3. 分析需求条目三, 生成测试要点", status: "pending" }, // 使用了 Unicode 复选框
        { id: 4, prefixIcon: "✏️", text: "4. 分析需求条目四, 生成测试要点", status: "pending" },
        { id: 5, prefixIcon: "🔗", text: "5. 分析需求条目五, 生成测试要点", status: "pending" },
        { id: 6, prefixIcon: "📄", text: "6. 分析需求条目六, 生成测试要点", status: "pending" },
      ],
      currentProcessingStepIndex: -1, // -1表示尚未开始, 0表示第一个步骤处理中
      pollingInterval: null,
      errorMessage: null,
      allStepsCompleted: false,
      // --- 用于模拟后端 ---
      mockBackendStep: -1, // 0-indexed, -1 means not started
      mockTotalSteps: 6,
      // --------------------
    };
  },
  methods: {
    async fetchStatus() {
      try {
        // --- 模拟API调用 ---
        // 在真实应用中, 您会使用 fetch 或 axios 等发起网络请求
        // const response = await fetch(`${MOCK_API_URL}?someParam=value`);
        // if (!response.ok) {
        //   throw new Error(`API请求失败: ${response.status}`);
        // }
        // const data = await response.json();
        // this.currentProcessingStepIndex = data.current_step_index; // 假设API返回这样的结构
        // --------------------

        // --- 使用模拟数据 ---
        await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟网络延迟
        if (this.mockBackendStep < this.mockTotalSteps -1) {
            this.mockBackendStep++;
        } else if (this.mockBackendStep === this.mockTotalSteps -1) {
            // 标记最后一个步骤为进行中，下一次轮询时会标记为完成
        } else { // 所有步骤都已模拟完成
            this.allStepsCompleted = true;
            clearInterval(this.pollingInterval);
            this.updateStepStatuses(); // 最后更新一次状态
            console.log("所有步骤完成，停止轮询。");
            return;
        }
        this.currentProcessingStepIndex = this.mockBackendStep;
        // --------------------

        this.updateStepStatuses();

        // 检查是否所有步骤都已完成 (基于 currentProcessingStepIndex 和总步骤数)
        // 这里的逻辑是：如果 currentProcessingStepIndex 指向最后一个步骤，并且该步骤已完成
        // 或者，如果API返回了一个明确的完成信号
        if (this.currentProcessingStepIndex >= this.steps.length -1 && this.steps[this.steps.length -1].status === 'completed') {
             // 这种情况由模拟逻辑中的 allStepsCompleted 处理
        }

      } catch (error) {
        this.errorMessage = `获取状态失败: ${error.message}`;
        console.error("获取状态失败:", error);
        clearInterval(this.pollingInterval); // 出错时停止轮询
      }
    },
    updateStepStatuses() {
      if (this.allStepsCompleted) {
        this.steps.forEach(step => step.status = 'completed');
        return;
      }

      this.steps.forEach((step, index) => {
        if (index < this.currentProcessingStepIndex) {
          step.status = "completed";
        } else if (index === this.currentProcessingStepIndex) {
          step.status = "in-progress";
        } else {
          step.status = "pending";
        }
      });

      // 特殊处理：如果 currentProcessingStepIndex 已经超出了最后一个步骤的索引，
      // 并且 allStepsCompleted 仍为 false，说明最后一个步骤刚刚完成。
      // 模拟逻辑中，_mockBackendStep 会等于 mockTotalSteps 时，allStepsCompleted 会为 true
      // 但如果API直接返回一个表示全部完成的状态，这里可能需要调整
      if (this.currentProcessingStepIndex >= this.steps.length) {
          this.allStepsCompleted = true;
          this.steps.forEach(step => step.status = 'completed');
          clearInterval(this.pollingInterval);
      }
    },
    startPolling() {
      this.fetchStatus(); // 立即获取一次状态
      this.pollingInterval = setInterval(this.fetchStatus, 2000); // 每2秒轮询一次
    },
  },
  mounted() {
    this.startPolling();
  },
  beforeUnmount() {
    clearInterval(this.pollingInterval); // 组件销毁前清除定时器
  },
};
</script>

<style scoped>
.analysis-status-page {
  font-family: sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background-color: #f4f7f9;
  border-radius: 8px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 25px;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.step-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 6px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  transition: background-color 0.3s ease;
}

.step-item.completed,
.step-item.in-progress {
  background-color: #e9f5ff; /* 淡蓝色背景，类似图片 */
  border-color: #cce7ff;
}

.step-icon-prefix {
  margin-right: 10px;
  font-size: 1.2em;
}

.step-text {
  flex-grow: 1;
  color: #555;
}

.step-item.completed .step-text {
  color: #2a7f2a; /* 完成状态的文本颜色可以深一些 */
}
.step-item.in-progress .step-text {
  color: #0056b3; /* 进行中状态的文本颜色 */
}


.step-status-icon {
  width: 24px; /* 固定宽度以便对齐 */
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}

/* Spinner CSS */
.spinner {
  border: 3px solid rgba(0, 0, 0, 0.1);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-left-color: #007bff; /* 蓝色，类似图片 */
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.info-message {
  margin-top: 25px;
  padding: 12px;
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
  color: #0050b3;
  display: flex;
  align-items: center;
  font-size: 0.9em;
}
.completion-message {
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  color: #389e0d;
}


.info-icon {
  margin-right: 8px;
  font-size: 1.2em;
}

.error-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #ffebee;
  border: 1px solid #ffcdd2;
  color: #c62828;
  border-radius: 4px;
}
</style>