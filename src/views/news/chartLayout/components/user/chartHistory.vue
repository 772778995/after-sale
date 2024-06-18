<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const historyInput = ref('')
</script>

<template>
  <div class="history-container">
    <el-input
      v-model="historyInput"
      size="large"
      placeholder="请输入内容"
      :prefix-icon="Search"
    />
    <div class="history-num">搜索到6条消息记录</div>
    <div class="history-item" v-for="item in 5" :key="item">
      <div class="history-top">
        <img src="@/assets/images/default_unknow@2x.png" />
        <p class="user-name">芒果补丁仔</p>
        <span>2024-05-01 16：32</span>
      </div>
      <div class="history-bottom">
        <div class="content">您好客服，请问这么购买配件</div>
        <div class="tag">定位到该消息</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.history-container {
  .history-num {
    font-weight: 400;
    font-size: 14px;
    color: #606677;
    text-align: center;
    padding: 16px 0;
  }
  .history-item {
    padding: 15px 0;
    .history-top {
      font-weight: 400;
      font-size: 14px;
      color: #606677;
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      .user-name {
        padding: 0 10px;
        max-width: 115px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .history-bottom {
      font-weight: 400;
      font-size: 16px;
      color: #606677;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 5px;
      .content {
        width: 224px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tag {
        color: #06c270;
      }
    }
  }
}
</style>
