<script setup lang="ts"></script>

<template>
  <ul class="info">
    <li>
      <div class="box">
        用户ID：
        <span>111112222</span>
      </div>
      <div class="box">
        用户昵称：
        <span>张小花</span>
      </div>
      <div class="box">
        用户手机号：
        <span>13122335566</span>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.info {
  width: 1421px;
  height: 60px;
  border: 1px solid #e3e3e3;
  margin-left: 16px;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 400;
    font-size: 14px;
    color: #606677;
    .box {
      height: 60px;
      line-height: 60px;
      flex: 1;
      border-right: 1px solid #e3e3e3;
      padding-left: 22px;
      span {
        color: #303133;
      }
      &:last-child {
        border: 0;
      }
    }
  }
}
</style>
