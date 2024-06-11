<script setup lang="ts">
import orderList from '../components/orderList.vue'
import orderHeader from '../components/orderHeader.vue'
import orderDetail from '../components/orderDetail.vue'
import useLayoutSettingStore from '@/stores/modules/setting'
const useSettingStore = useLayoutSettingStore()
</script>

<template>
  <div class="order-contanier">
    <orderList
      v-if="!useSettingStore.headerShow && !useSettingStore.orderDetailPage"
    />
    <orderHeader v-if="useSettingStore.headerShow" />
    <orderDetail v-if="useSettingStore.orderDetailPage" />
  </div>
</template>

<style scoped lang="scss">
.order-contanier {
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
}
</style>
