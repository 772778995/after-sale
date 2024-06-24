<script setup lang="ts">
import useChartStore from '@/stores/modules/chart'
import { formatConversionTime } from '@/utils/im'
const useChart = useChartStore()
const handleChartPage = (conversation: any) => {
  useChart.handleChartPage(conversation)
}
</script>

<template>
  <div
    class="list-item"
    v-for="item in useChart.conversationList"
    :key="item.userID"
    @click="handleChartPage(item)"
  >
    <div class="avatar">
      <img :src="item.faceURL" />
    </div>
    <div class="info">
      <div class="info-title">
        <div class="title">{{ item.showName }}</div>
        <div class="time">
          {{ formatConversionTime(item.latestMsgSendTime) }}
        </div>
      </div>
      <div class="info-content">
        <div class="content">
          {{ JSON.parse(item.latestMsg).textElem?.content }}
        </div>
        <div class="nums" v-if="item.unreadCount > 0">
          {{ item.unreadCount }}
        </div>
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
