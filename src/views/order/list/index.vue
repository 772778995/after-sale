<script setup lang="ts">
import orderList from '../components/orderList.vue'
</script>

<template>
  <div class="order-contanier">
    <orderList />
  </div>
</template>

<style scoped lang="scss">
.order-contanier {
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
}
.demo-form-inline .el-input {
  --el-input-width: 210px;
}
</style>
