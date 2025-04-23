<template>
  <!-- 最外层容器，高度撑满整个浏览器屏幕 -->
  <div class="min-h-screen">
    <!-- 顶部导航 -->
    <header class="flex items-center h-[74px] bg-gray-100 border-b border-gray-200 px-4">
      顶部导航
    </header>
    <!-- 底部内容去 -->
    <div class="flex flex-row h-[calc(100vh-74px)]">
      <!-- 左侧的编排 -->
      <div class="w-2/3 bg-gray-50 g-full">
        <header class="flex items-center h-16 border-b border-gray-200 px-7 text-xl text-gray-700">
          应用编排
        </header>
        <div class="flex flex-row h-[calc(100%-64px)]">
          <div class="flex-1 border-r border-gray-200 p-6 border">人设与回复逻辑</div>
          <div class="flex-1 p-6 ">应用能力</div>
        </div>
      </div>
      <!-- 右侧调试与预览 -->
      <div class="flex flex-col w-1/3 bg-white h-full ">
        <!-- 调试与预览 -->
        <header
          class="flex items-center  flex-shrink-0 tems-center h-16 px-4 text-xl bg-white border-b border-gray-200 shadow-sm"
        >
          调试与预览</header>
        <!-- 调试对话界面 -->
        <div class="h-full min-h-0 px-6 py-7 overflow-x-hidden overflow-y-scroll scollbar-w-none">
          <!-- 人类消息 -->
          <div
            class="flex flex-row gap-2 mb-6"
            v-for="message in messages"
            :key="message.content"
          >
            <!-- 头像 -->
            <!-- 头像 -->
            <a-avatar
              v-if="message.role === 'human'"
              :style="{ backgroundColor: '#00d0b6' }"
              :size="30"
              class="flex-shrink-0"
            >V</a-avatar>
            <a-avatar
              v-else
              :style="{ backgroundColor: '#3370ff' }"
              :size="30"
              class="flex-shrink-0"
            >
              <icon-apps />
            </a-avatar>

            <div class="flex flex-col gap-2">
              <div class="font-semibold text-gray-700 ">{{ message.role === 'human' ? 'VV' : '我是聊天机器人' }}</div>
              <div
                v-if="message.role === 'human'"
                class="max-w-max bg-blue-700 text-white border border-blue-800 px-4 py-3 rounded-2xl"
              >
                {{ message.content }}
              </div>
              <div
                v-else
                class="max-w-max bg-gray-100 text-gray-900 border border-gray-200 px-4 py-3 rounded-2xl"
              >
                {{ message.content }}
              </div>
            </div>

          </div>
          <!-- 没有任何消息时 -->
          <div
            v-if="!messages.length"
            class="mt-[200px] flex flex-col items-center justify-center gap-2"
          >
            <a-avatar
              :size="70"
              shape="square"
              :style="{ backgroundColor: '#00d0b6' }"
            >
              <icon-apps />
            </a-avatar>
            <div class="text-2xl font-semibold text-gray-900 mt-2">ChatGPT聊天机器人</div>
          </div>
          <!-- AI加载状态 -->
          <div
            v-if="isLoading"
            class="flex flex-row gap-2 mb-6"
          >
            <!-- 头像 -->
            <a-avatar
              :style="{ backgroundColor: '#00d0b6' }"
              :size="30"
              class="flex-shrink-0"
            >
              <icon-apps />
            </a-avatar>
            <div class="flex flex-col gap-2">
              <div class="font-semibold text-gray-700 ">ChatGPT聊天机器人</div>
              <div class="max-w-max bg-gray-100 text-gray-900 border border-gray-200 px-4 py-3 rounded-2xl">
                <icon-loading />
              </div>
            </div>
          </div>
        </div>
        <!-- 调试对话输入框 -->
        <div class="w-full flex-shrink-0 flex flex-col">
          <!-- 顶部输入框 -->
          <div class="px-6 flex items-center gap-4">
            <!-- 清除按钮 -->
            <a-button
              class="flex-shrink-0"
              type="text"
              shape="circle"
            >
              <template #icon>
                <icon-empty
                  :size="16"
                  :style="{ color: '374151' }"
                  @click="clearMessages"
                ></icon-empty>
              </template>
            </a-button>
            <!-- 输入框 -->
            <div class="h-[50px] flex items-center gap-2 px-4 border flex-1 border-gray-100 rounded-full">
              <input
                type="text"
                class="flex-1 outline-0"
                v-model="query"
                @keyup.enter="sendMessage"
              >
              <a-button
                type="text"
                shape="circle"
              >
                <template #icon>
                  <icon-plus-circle
                    size="16"
                    :style="{ coler: '#374151' }"
                  ></icon-plus-circle>
                </template>
              </a-button>
              <a-button
                type="text"
                shape="circle"
              >
                <template #icon>
                  <icon-send
                    size="16"
                    :style="{ coler: '#1d4ed8' }"
                    @click="sendMessage"
                  ></icon-send>
                </template>
              </a-button>
            </div>
          </div>
          <!-- 底部提示文字 -->
          <div class="text-center text-gray-500 text-xs py-4 ">
            内容由AI生成，无法确保真实准确，仅供参考。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { debugApp } from '@/service/app'
import Message from '@arco-design/web-vue/es/message'
import { ref } from 'vue'
const query = ref('')
const messages = ref<Array<{ role: string, content: string }>>([])
const isLoading = ref(false)

const clearMessages = () => {

  messages.value = []
}
const sendMessage = async () => {
  if (!query.value) {
    Message.error('请输入内容')
    return
  }
  if (isLoading.value) {
    Message.error('上一次回复还未结束，请稍等')
    return
  }

  try {
    isLoading.value = true
    const humanQuery = query.value

    query.value = ''

    messages.value.push({
      role: 'human',
      content: humanQuery
    })
    const response = await debugApp("sadas", humanQuery)
    messages.value.push({
      role: 'ai',
      content: response.data.content
    })
  } catch (error) {
    Message.error((error as Error).message || '请求失败')
    return
  } finally {
    isLoading.value = false
  }
}
</script>

<style></style>
