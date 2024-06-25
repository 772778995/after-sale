<script setup lang="ts">
import LoginForm from './components/loginForm.vue'
import RegisterForm from './components/registerForm.vue'
import useLayoutSettingStore from '@/stores/modules/setting'
const useSettingStore = useLayoutSettingStore()
</script>

<template>
  <div class="login-container">
    <div class="container-boxs">
      <LoginForm v-if="useSettingStore.loginStatusShow" />
      <RegisterForm v-else />
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/icon_login-bg.png') no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 310px;
  .container-boxs {
    width: 526px;
    height: 658px;
    background: #fff;
    border-radius: 4px;
  }
}
:deep(.el-form-item) {
  margin-bottom: 30px;
}
:deep(.el-input__wrapper) {
  background: #f3f5f9;
  border: none;
  box-shadow: none;
}
:deep(.el-input-group__append) {
  background: #f3f5f9;
  border: none;
  box-shadow: none;
  color: #2e92fa;
}
</style>
