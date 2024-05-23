<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { reqNavi } from '@/api/user'
onMounted(async () => {
  await reqNavi()
})
</script>

<template>
  <RouterView />
</template>
<style></style>
