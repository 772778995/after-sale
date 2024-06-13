<script setup lang="ts"></script>

<template>
  <el-scrollbar>
    <div class="scrollbar-flex-content">
      <ul v-for="item in 4" :key="item" class="scrollbar-demo-item">
        <li>
          <div>
            <p class="title">测试报告时间：</p>
            <span>2024-01-27 17：30</span>
          </div>
        </li>
        <li>
          <div>
            <p class="title">测试工程师：</p>
            <span>工程师-小帅</span>
          </div>
        </li>
        <li>
          <div>
            <p class="title">测试结果：</p>
            <span>通过</span>
          </div>
        </li>
      </ul>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.el-scrollbar {
  width: 1421px;
  height: 134px;
  background: #f7f7f7;
  margin-left: 16px;
  padding: 0 23px;

  .scrollbar-flex-content {
    height: 134px;
    display: flex;
    align-items: center;

    .scrollbar-demo-item {
      flex-shrink: 0;
      width: 450px;
      height: 98px;
      margin-right: 16px;
      border-radius: 4px;
      background: #ffffff;

      &:last-child {
        margin-right: 0;
      }

      li {
        padding: 13px 8px 0 8px;

        p {
          font-weight: 400;
          font-size: 14px;
          color: #606677;
          display: flex;

          .title {
            width: 125px;
          }

          span {
            color: #303133;
          }
        }
      }
    }
  }
}
</style>
