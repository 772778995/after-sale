<script setup lang="ts">
// let prop = defineProps(['content'])
// import { useRouter } from 'vue-router'
// const $router = useRouter()
const handleChartPage = () => {}
</script>

<template>
  <div
    class="list-item"
    v-for="item in 20"
    :key="item"
    @click="handleChartPage"
  >
    <div class="avatar">
      <img src="@/assets/images/default_unknow@2x.png" />
    </div>
    <div class="info">
      <div class="info-title">
        <div class="title">芒果补丁仔</div>
        <div class="time">15.30</div>
      </div>
      <div class="info-content">
        <div class="content">
          你好，我的乐器坏了，声音很尖锐不知道是什么问题？
        </div>
        <div class="nums">3</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-item {
  height: 70px;
  //   background-color: aliceblue;
  display: flex;
  align-items: center;
  .avatar {
    margin: 0 16px;
    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
  }
  .info {
    .info-title {
      display: flex;
      justify-content: space-between;
      font-weight: 400;
      font-size: 14px;
      color: #606677;
    }
    .info-content {
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      font-weight: 400;
      font-size: 16px;
      color: #303133;
      .content {
        width: 254px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .nums {
        padding: 1px 4px;
        font-size: 14px;
        background: #ea5656;
        border-radius: 50%;
        color: #fff;
        margin-left: 20px;
      }
    }
  }
}
</style>
