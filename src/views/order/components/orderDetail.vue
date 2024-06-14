<script setup lang="ts">
import orderInfo from './Detail/orderInfo.vue'
import userInfo from './Detail/userInfo.vue'
import payInfo from './Detail/payInfo.vue'
import MaterialFlowInfo from './Detail/MaterialFlowInfo.vue'
import equipmentInfo from './Detail/equipmentInfo.vue'
import testRecord from './Detail/testRecord.vue'
import Controls from './Detail/Controls.vue'
// import orderFlow from './Detail/orderFlow.vue'
import useLayoutSettingStore from '@/stores/modules/setting.ts'
const useSettingStore = useLayoutSettingStore()
</script>

<template>
  <!-- <div class="title-boxs">
    <div class="title-line"></div>
    <div class="title-name">订单流程</div>
  </div>
  <orderFlow /> -->
  <div class="title-boxs">
    <div class="title-line"></div>
    <div class="title-name">订单信息</div>
  </div>
  <orderInfo />
  <div class="box-line"></div>
  <div class="title-boxs">
    <div class="title-line"></div>
    <div class="title-name">用户信息</div>
  </div>
  <userInfo />
  <div class="box-line"></div>
  <div class="title-boxs">
    <div class="title-line"></div>
    <div class="title-name">支付信息</div>
  </div>
  <payInfo />
  <div class="box-line"></div>
  <div class="title-boxs">
    <div class="title-line"></div>
    <div class="title-name">物流信息</div>
  </div>
  <MaterialFlowInfo />
  <div class="box-line"></div>
  <div class="title-boxs">
    <div class="title-line"></div>
    <div class="title-name">设备管理(1台)</div>
  </div>
  <equipmentInfo />
  <div class="box-line"></div>
  <div v-if="useSettingStore.showMode >= 4">
    <div class="title-boxs">
      <div class="title-line"></div>
      <div class="title-name">测试记录</div>
    </div>
    <testRecord />
    <div class="box-line"></div>
  </div>
  <div class="title-boxs">
    <div class="title-line"></div>
    <div class="title-name">管理操作</div>
  </div>
  <Controls />
</template>

<style scoped lang="scss">
.title-boxs {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  .title-line {
    width: 3px;
    height: 14px;
    background-color: #409eff;
    margin: 0 18px 0 16px;
  }
  .title-name {
    font-weight: 500;
    font-size: 16px;
    color: #303133;
  }
}
.box-line {
  width: 100%;
  height: 1px;
  background: #f5f5f5;
  margin-top: 40px;
}
</style>
