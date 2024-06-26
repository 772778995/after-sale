<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>
<style>
/* 整个滚动条 */
::-webkit-scrollbar {
  width: 6px; /* 设置滚动条的宽度 */
}
 
/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: #f1f1f1; /* 设置轨道的背景颜色 */
}
 
/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background: #D9D9D9; /* 设置滑块的背景颜色 */
  border-radius: 10px;
}
 
/* 当鼠标悬停在滑块上 */
::-webkit-scrollbar-thumb:hover {
  background: #D9D9D9; /* 设置滑块在悬停状态下的背景颜色 */
  border-radius: 10px;
}
</style>
