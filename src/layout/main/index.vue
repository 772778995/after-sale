<script setup lang="ts">
import { CloseBold } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const $route = useRoute()
console.log($route, '66666')
</script>

<template>
  <div class="breadcrumb">
    <img src="@/assets/images/icon-fold-btns.png" />
    <div class="breadcrumb-box">
      <div class="breadcrumb-item" v-for="item in 20">
        <p class="title">订单管理{{ item }}</p>
        <el-icon color="#606677"><CloseBold /></el-icon>
      </div>
    </div>
  </div>
  <div class="mainContent">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb {
  width: 100%;
  height: 64px;
  display: flex;
  align-items: end;
  img {
    width: 22px;
    height: 20px;
    margin: 0 16px 9px 16px;
  }
  .breadcrumb-box {
    flex: 0.95;
    display: flex;
    align-items: center;
    overflow-y: hidden;
    flex-wrap: nowrap;
    .breadcrumb-item {
      height: 42px;
      // background: url('@/assets/images/icon-breadcrumb-bg.png') no-repeat;
      // background-size: cover;
      display: flex;
      align-items: center;
      white-space: nowrap;
      padding-right: 27px;
      .title {
        text-align: center;
        font-weight: 700;
        font-size: 16px;
        // color: #303133;
        color: #606677;
        flex: 0.9;
        padding: 0 45px 0 30px;
      }
    }
  }
}
.mainContent {
  height: calc(100% - 64px - 65px);
  background-color: #f5f5f5;
  padding: 16px 21px 16px 11px;
  margin: 0 24px 65px 0;
  border-radius: 0 10px 10px;
}

/* 隐藏滚动条的样式 */
::-webkit-scrollbar {
  display: none;
}
</style>
