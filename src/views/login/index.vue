<script setup lang="ts">
import useUserStore from '@/stores/modules/user.ts'
import { ElNotification } from 'element-plus'
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const useStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
const loginForm = reactive({
  login: '13777777777',
  verifiable_code: '111111',
})
const handleLogin = () => {
  useStore
    .userLogin(loginForm)
    .then(async () => {
      let redirect: any = $route.query.redirect
      $router.push({ path: redirect || '/' })
      ElNotification({
        type: 'success',
        message: '登录成功',
      })
    })
    .catch((error) => {
      ElNotification({
        type: 'error',
        message: error.message,
      })
    })
}
</script>

<template>
  <el-button @click="handleLogin">登录</el-button>
</template>

<style scoped lang="scss"></style>
