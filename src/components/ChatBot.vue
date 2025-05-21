<template>
  <div class="chat-container">
    <div class="chat-header">
      <div class="chat-title">AI 智能助手</div>
      <div class="refresh-btn" @click="refreshChat">
        <i class="refresh-icon"></i>
      </div>
    </div>

    <div class="chat-messages" ref="chatMessages">
      <div
        v-for="message in messages"
        :key="message.id"
        class="message-wrapper"
      >
        <div
          :class="['message', message.isUser ? 'user-message' : 'ai-message']"
        >
          <div class="avatar" v-if="!message.isUser">
            <div class="ai-avatar"></div>
          </div>
          <div
            class="message-content"
            v-html="formatMessage(message.content)"
          ></div>
          <div class="avatar" v-if="message.isUser">
            <div class="user-avatar"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="chat-actions" v-if="lastAiMessage && !isProcessing">
      <button class="action-btn regenerate" @click="regenerateResponse">
        <i class="regenerate-icon"></i> 重新生成
      </button>
      <button class="action-btn sync" @click="syncToMindMap">
        <i class="sync-icon"></i> 同步到脑图
      </button>
    </div>

    <div class="chat-input">
      <textarea
        v-model="userInput"
        placeholder="输入问题或建议..."
        @keyup.enter="sendMessage"
        rows="1"
        ref="inputArea"
        :disabled="isProcessing"
      ></textarea>
      <button
        class="send-btn"
        @click="sendMessage"
        :disabled="!userInput.trim() || isProcessing"
      >
        <i class="send-icon"></i> 发送
      </button>
    </div>
  </div>
</template>

<script>
import {
  fetchEventSource,
  EventStreamContentType,
} from "@microsoft/fetch-event-source";

// 自定义错误类用于控制 fetchEventSource 的行为
class FatalError extends Error {
  constructor(message) {
    super(message);
    this.name = "FatalError";
  }
}
class RetriableError extends Error {
  constructor(message) {
    super(message);
    this.name = "RetriableError";
  }
}

export default {
  name: "ChatBot",
  props: {
    initialData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      messages: [], // 每条消息结构: { id: string, content: string, isUser: boolean, timestamp: number }
      userInput: "",
      isProcessing: false,
      lastUserMessage: null,
      lastAiMessage: null,
      currentAbortController: null, // 用于中止正在进行的 fetch 请求
      conversationId: null, // Add this line to store conversation_id
    };
  },
  watch: {
    initialData: {
      handler(newVal) {
        if (newVal && Object.keys(newVal).length > 0) {
          this.handleExternalData(newVal);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.adjustTextareaHeight();
    if (this.initialData && Object.keys(this.initialData).length > 0) {
      this.handleExternalData(this.initialData);
    }
  },
  methods: {
    handleExternalData(data) {
      if (this.isProcessing && this.currentAbortController) {
        this.currentAbortController.abort();
      }
      if (data.type === "question") {
        this.addMessage(data.content, true);
        this.getAiResponse(data.content);
      } else if (data.type === "conversation") {
        this.messages = (data.messages || []).map((m) => ({
          ...m,
          id: m.id || this.generateMessageId(m.isUser),
        }));
        this.updateLastMessages();
      }
    },

    generateMessageId(isUser = false) {
      return `${isUser ? "user" : "ai"}-${new Date().getTime()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    },

    sendMessage() {
      const messageContent = this.userInput.trim();
      if (!messageContent || this.isProcessing) return;

      this.addMessage(messageContent, true);
      this.userInput = "";
      this.adjustTextareaHeight();
      this.getAiResponse(messageContent);
    },

    addMessage(content, isUser = false, id = null) {
      const messageId = id || this.generateMessageId(isUser);
      this.messages.push({
        id: messageId,
        content,
        isUser,
        timestamp: new Date().getTime(),
      });

      this.updateLastMessages();
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      return messageId;
    },

    updateLastMessages() {
      this.lastUserMessage =
        this.messages.filter((m) => m.isUser).pop() || null;
      this.lastAiMessage =
        this.messages
          .filter(
            (m) => !m.isUser && m.content && m.content !== "AI正在思考中..."
          )
          .pop() || null;
    },

    async getAiResponse(userMessageContent) {
      if (this.isProcessing && this.currentAbortController) {
        this.currentAbortController.abort(); // Abort previous request if any
      }
      this.currentAbortController = new AbortController();
      const localAbortController = this.currentAbortController; // Capture current controller

      this.isProcessing = true;

      const aiMessageId = this.addMessage("", false); // Add empty AI message placeholder
      let aiMessageIndex = this.messages.findIndex((m) => m.id === aiMessageId);

      if (aiMessageIndex === -1) {
        // Should not happen
        console.error("Failed to add AI message placeholder");
        this.isProcessing = false;
        return;
      }
      this.messages[aiMessageIndex].content = "AI正在思考中...";
      this.lastAiMessage = null; // Hide action buttons while processing

      // API 配置 - 警告：API密钥不应硬编码在前端
      const apiKey = "BOB_MAAS-EXBdLfj1.bsNWW8OWvvAb56AFKD3VAiGzrKL3jOzU";
      const apiUrl = "/api/ai"; // 使用代理URL而不是直接访问外部API

      try {
        await fetchEventSource(apiUrl, {
          method: "POST",
          headers: {
            "MAAS-API-KEY": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            conversation_id: this.conversationId || "", // Use stored conversation_id
            inputs: {}, // TODO: Populate if API requires specific inputs
            query: userMessageContent,
            streaming: true,
          }),
          signal: localAbortController.signal,

          onopen: async (response) => {
            if (localAbortController.signal.aborted) return; // Check if aborted
            if (
              response.ok &&
              response.headers
                .get("content-type")
                ?.includes(EventStreamContentType)
            ) {
              if (
                this.messages[aiMessageIndex]?.content === "AI正在思考中..."
              ) {
                this.messages[aiMessageIndex].content = ""; // Clear placeholder
              }
              return;
            } else if (
              response.status >= 400 &&
              response.status < 500 &&
              response.status !== 429
            ) {
              const errorText = await response.text();
              throw new FatalError(
                `客户端错误: ${response.status} - ${errorText}`
              );
            } else {
              const errorText = await response.text();
              throw new RetriableError(
                `服务器错误: ${response.status} - ${errorText}`
              );
            }
          },
          onmessage: (msg) => {
            // console.log('Received message:', msg);
            if (localAbortController.signal.aborted) return;

            if (msg.event === "FatalError") {
              // Example server-sent error event
              throw new FatalError(msg.data);
            }

            const currentAiMsg = this.messages[aiMessageIndex];
            if (!currentAiMsg) return;

            if (currentAiMsg.content === "AI正在思考中...") {
              currentAiMsg.content = ""; // Clear placeholder on first actual data
            }

            let textChunk = "";
            try {
              // Attempt to parse msg.data if it's expected to be JSON
              // This part is highly dependent on the actual API's streaming format
              const parsedData = JSON.parse(msg.data);
              console.log("Parsed data:", parsedData);
              if (parsedData.data && typeof parsedData.data === "object" && parsedData.data.conversation_id) {
                // we need to store conversation_id here with parsedData.data.conversation_id
                this.conversationId = parsedData.data.conversation_id; // Store conversation_id
                console.log("Stored conversation_id:", this.conversationId);
              }
              if (typeof parsedData === "object" && parsedData !== null && typeof parsedData.content === "string") {
                textChunk = parsedData.content;
              }
            } catch (e) {
              textChunk = msg.data; // If JSON.parse fails, assume msg.data is plain text
            }
            currentAiMsg.content += textChunk;
            this.scrollToBottom();
          },
          onclose: () => {
            if (localAbortController.signal.aborted) {
              console.log("Stream aborted by client.");
              // Ensure the message doesn't stay in "thinking" state if aborted early
              const currentAiMsg = this.messages[aiMessageIndex];
              if (currentAiMsg && currentAiMsg.content === "AI正在思考中...") {
                currentAiMsg.content = "[已取消]";
              }
            } else {
              console.log("Stream closed by server.");
              const currentAiMsg = this.messages[aiMessageIndex];
              if (currentAiMsg && currentAiMsg.content === "AI正在思考中...") {
                currentAiMsg.content = "AI未返回有效内容。";
              }
            }
            if (localAbortController === this.currentAbortController) {
              // Only update if this is the active controller
              this.isProcessing = false;
              this.currentAbortController = null;
            }
            this.updateLastMessages();
          },
          onerror: (err) => {
            // This error handler is for errors during the stream.
            // Errors from onopen (like FatalError/RetriableError) are caught by the outer try/catch.
            const currentAiMsg = this.messages[aiMessageIndex];
            if (currentAiMsg) {
              if (
                currentAiMsg.content === "AI正在思考中..." ||
                currentAiMsg.content === ""
              ) {
                currentAiMsg.content = "抱歉，与AI通信时发生错误。";
              } else {
                currentAiMsg.content += "\n[连接中断]";
              }
            }

            if (localAbortController === this.currentAbortController) {
              this.isProcessing = false;
              this.currentAbortController = null;
            }
            this.updateLastMessages();

            if (err instanceof FatalError) {
              console.error("Fatal stream error:", err.message);
              throw err; // Stop retries
            } else if (err instanceof RetriableError) {
              console.warn(
                "Retriable stream error:",
                err.message,
                "Will retry if configured."
              );
              // To explicitly stop retrying for RetriableError too, throw it or a new FatalError.
              // By default, fetchEventSource might retry. To prevent:
              throw new FatalError(
                `Retriable error occurred, stopping: ${err.message}`
              );
            } else {
              console.error("Unhandled stream error:", err);
              // Treat other errors as fatal to prevent potential infinite retries.
              throw new FatalError(
                `Unhandled stream error: ${
                  err.message || "Unknown stream error"
                }`
              );
            }
          },
        });
      } catch (err) {
        // Catches errors from fetchEventSource setup or errors re-thrown from its callbacks
        if (localAbortController.signal.aborted && err.name === "AbortError") {
          console.log("Fetch aborted as expected.");
          const currentAiMsg = this.messages[aiMessageIndex];
          if (currentAiMsg && currentAiMsg.content === "AI正在思考中...") {
            currentAiMsg.content = "[已取消]";
          }
        } else {
          console.error("Failed to fetch AI response:", err);
          const currentAiMsg = this.messages[aiMessageIndex];
          if (currentAiMsg) {
            currentAiMsg.content = `抱歉，连接AI服务失败: ${err.message}`;
          }
        }
        if (localAbortController === this.currentAbortController) {
          this.isProcessing = false;
          this.currentAbortController = null;
        }
        this.updateLastMessages();
      }
    },

    // ... existing code ...
    regenerateResponse() {
      if (!this.lastUserMessage) return;
      // If already processing, abort current and start new one
      if (this.isProcessing && this.currentAbortController) {
        this.currentAbortController.abort();
        // isProcessing will be set to false by the aborted request's onclose/onerror
      }

      // Remove last AI message(s) if they exist
      // Find the index of the last user message
      let lastUserMsgIndex = -1;
      for (let i = this.messages.length - 1; i >= 0; i--) {
        if (this.messages[i].isUser) {
          lastUserMsgIndex = i;
          break;
        }
      }
      // Remove all AI messages after the last user message
      if (lastUserMsgIndex !== -1) {
        this.messages.splice(lastUserMsgIndex + 1);
      } else {
        // No user message, clear all AI messages
        this.messages = this.messages.filter((m) => m.isUser);
      }
      this.lastAiMessage = null; // Clear last AI message reference

      this.getAiResponse(this.lastUserMessage.content);
    },

    syncToMindMap() {
      if (!this.lastAiMessage || !this.lastAiMessage.content) {
        console.warn("No valid AI message content to sync.");
        return;
      }

      this.$emit("sync-to-mindmap", {
        aiMessage: this.lastAiMessage.content,
        userMessage: this.lastUserMessage ? this.lastUserMessage.content : "",
        timestamp: new Date().getTime(),
      });
    },

    refreshChat() {
      if (this.currentAbortController) {
        this.currentAbortController.abort();
        this.currentAbortController = null;
      }
      this.messages = [];
      this.lastUserMessage = null;
      this.lastAiMessage = null;
      this.isProcessing = false;
      this.userInput = ""; // Clear input field as well
      this.conversationId = null; // Reset conversation_id on refresh
    },

    formatMessage(content) {
      if (content === null || typeof content === "undefined") return "";
      let textContent = String(content);

      // Basic HTML escaping
      textContent = textContent
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

      const lines = textContent.split("\n");
      let htmlOutput = "";
      let listBuffer = [];
      let currentListType = null; // 'ul' for unordered, 'ol' for ordered

      const endCurrentList = () => {
        if (listBuffer.length > 0) {
          htmlOutput +=
            (currentListType === "ol" ? "<ol>" : "<ul>") +
            listBuffer.join("") +
            (currentListType === "ol" ? "</ol>" : "</ul>");
          listBuffer = [];
        }
        currentListType = null;
      };

      for (const line of lines) {
        const ulMatch = line.match(/^•\s*(.*)/);
        const olMatch = line.match(/^\d+\.\s*(.*)/);

        if (ulMatch) {
          if (currentListType !== "ul") {
            endCurrentList();
            currentListType = "ul";
          }
          listBuffer.push(`<li>${ulMatch[1]}</li>`);
        } else if (olMatch) {
          if (currentListType !== "ol") {
            endCurrentList();
            currentListType = "ol";
          }
          listBuffer.push(`<li>${olMatch[1]}</li>`);
        } else {
          endCurrentList();
          htmlOutput += line + (line ? "<br>" : ""); // Add <br> only if line is not empty, to avoid double <br> for empty lines
        }
      }
      endCurrentList(); // Ensure any pending list is flushed

      // Remove last <br> if it's redundant
      if (htmlOutput.endsWith("<br>")) {
        htmlOutput = htmlOutput.substring(0, htmlOutput.length - 4);
      }
      return htmlOutput;
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatMessages;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },

    adjustTextareaHeight() {
      const textarea = this.$refs.inputArea;
      if (textarea) {
        textarea.style.height = "auto"; // Reset height
        // Set a temporary max-height to prevent excessive growth during calculation
        const maxHeight =
          parseInt(window.getComputedStyle(textarea).maxHeight, 10) || 120;
        textarea.style.height =
          Math.min(textarea.scrollHeight, maxHeight) + "px";
      }
    },
  },
  beforeDestroy() {
    // Cleanup: Abort any ongoing request when the component is destroyed
    if (this.currentAbortController) {
      this.currentAbortController.abort();
    }
  },
};
</script>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;

  .chat-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }

  .refresh-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z'/%3E%3C/svg%3E");
    background-size: contain;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;

  .message-wrapper {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .message {
    display: flex;
    align-items: flex-start;

    &.user-message {
      justify-content: flex-end;

      .message-content {
        background-color: #e1f5fe;
        border-radius: 18px 4px 18px 18px;
        margin-right: 12px;
      }
    }

    &.ai-message {
      justify-content: flex-start;

      .message-content {
        background-color: #f0f0f0;
        border-radius: 4px 18px 18px 18px;
        margin-left: 12px;
      }
    }
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;

    .ai-avatar {
      width: 100%;
      height: 100%;
      background-color: #6200ee;
      display: flex;
      align-items: center;
      justify-content: center;

      &:before {
        content: "";
        width: 20px;
        height: 20px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2zm0 8h2v2h-2z'/%3E%3C/svg%3E");
        background-size: contain;
      }
    }

    .user-avatar {
      width: 100%;
      height: 100%;
      background-color: #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;

      &:before {
        content: "";
        width: 20px;
        height: 20px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E");
        background-size: contain;
      }
    }
  }

  .message-content {
    padding: 12px 16px;
    max-width: 70%;
    word-break: break-word;
    font-size: 14px;
    line-height: 1.5;
    color: #333;

    ::v-deep ul {
      margin: 8px 0;
      padding-left: 20px;
    }

    ::v-deep li {
      margin-bottom: 4px;
    }
  }
}

.chat-actions {
  display: flex;
  justify-content: center;
  padding: 8px 16px;
  gap: 12px;

  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #e0e0e0;
    background-color: #fff;
    transition: all 0.2s;

    &:hover {
      background-color: #f5f5f5;
    }

    &.regenerate {
      color: #666;

      .regenerate-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 6px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z'/%3E%3C/svg%3E");
        background-size: contain;
      }
    }

    &.sync {
      color: #6200ee;
      border-color: #6200ee;

      .sync-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 6px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236200ee'%3E%3Cpath d='M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z'/%3E%3C/svg%3E");
        background-size: contain;
      }
    }
  }
}

.chat-input {
  display: flex;
  align-items: flex-end;
  padding: 12px 16px;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;

  textarea {
    flex: 1;
    min-height: 24px;
    max-height: 120px;
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    resize: none;
    font-size: 14px;
    line-height: 1.5;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #6200ee;
    }

    &::placeholder {
      color: #999;
    }
  }

  .send-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 12px;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    background-color: #6200ee;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #5000d6;
    }

    &:disabled {
      background-color: #e0e0e0;
      cursor: not-allowed;
    }

    .send-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 6px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z'/%3E%3C/svg%3E");
      background-size: contain;
    }
  }
}

// 适配移动设备
@media (max-width: 768px) {
  .message-content {
    max-width: 85%;
  }

  .chat-actions {
    flex-direction: column;
    align-items: center;

    .action-btn {
      width: 100%;
    }
  }
}
</style>
