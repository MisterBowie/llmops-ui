<script lang="ts" setup>
import { useAccountStore } from '@/stores/account'
const accountStore = useAccountStore()
</script>
<template>
  <div>
    <div>我是主页</div>
    <div>{{ accountStore.account.name }}</div>
    <div>{{ accountStore.account.email }}</div>
    <div>{{ accountStore.account.avatar }}</div>
    <a-button @click="accountStore.clear">清除</a-button>
    <a-button @click="accountStore.update({ name: '张三' })">更新</a-button>

  </div>
</template>

<style></style>
