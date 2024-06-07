<script setup lang="ts">
import orderList from '../components/orderList.vue'
import orderHeader from '../components/orderHeader.vue'
import useLayoutSettingStore from '@/stores/modules/setting'
const useSettingStore = useLayoutSettingStore()
</script>

<template>
  <div class="order-contanier">
    <orderList v-if="!useSettingStore.headerShow" />
    <orderHeader v-else />
  </div>
</template>

<style scoped lang="scss">
.order-contanier {
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
}
</style>
