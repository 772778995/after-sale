<script setup lang="ts">
import { ref, reactive } from 'vue'
import useLayoutSettingStore from '@/stores/modules/setting'
import ResetPwd from './resetPwd.vue'
const useSettingStore = useLayoutSettingStore()
const centerDialogVisible = ref(false)
const tabItem = reactive(['账号密码登录', '验证码登录'])
const currentTab = ref(0)
const loginForm = ref<any>({
  login: '',
  verifiable_code: '',
  password: '',
  confirmPassword: '',
})
const switchTab = (index: number) => {
  currentTab.value = index
}
const switchRegisterPage = () => {
  useSettingStore.loginStatusShow = false
}
const handeleForgetPwd = () => {
  centerDialogVisible.value = !centerDialogVisible.value
  console.log(centerDialogVisible.value)
}
</script>

<template>
  <div class="login">
    <p class="title">登录</p>
    <div class="tabs">
      <div
        class="tabs-item"
        :class="[currentTab == index ? 'active' : '']"
        v-for="(tab, index) in tabItem"
        :key="index"
        @click="switchTab(index)"
      >
        <p>{{ tab }}</p>
        <div class="line-b" v-if="currentTab == index"></div>
      </div>
    </div>
    <el-form :model="loginForm" v-if="currentTab != 1">
      <el-form-item>
        <el-input
          v-model="loginForm.login"
          class="inputs"
          placeholder="请输入账号/ 手机号"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="loginForm.password"
          class="inputs"
          placeholder="请输入密码"
        >
          <template #append>
            <el-button type="primary" text @click="handeleForgetPwd">
              忘记密码？
            </el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-form :model="loginForm" v-else>
      <el-form-item>
        <el-input
          v-model="loginForm.login"
          class="inputs"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="loginForm.verifiable_code"
          class="inputs"
          placeholder="请输入验证码"
        >
          <template #append>
            <el-button type="primary" text>获取验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="btns-bottom">
      <el-button type="primary" class="login-btns">登录</el-button>
      <el-button
        type="primary"
        link
        class="register-btns"
        @click="switchRegisterPage"
      >
        快速注册
      </el-button>
    </div>
  </div>
  <ResetPwd :dialogVisible="centerDialogVisible" @update-visible="handeleForgetPwd" />
</template>

<style scoped lang="scss">
.login {
  padding: 50px;
  .title {
    height: 82px;
    line-height: 82px;
    font-weight: 500;
    font-size: 30px;
    color: #303133;
  }
  .tabs {
    padding: 40px 0;
    font-size: 18px;
    display: flex;
    .tabs-item {
      font-weight: 400;
      color: #a9a9af;
      display: flex;
      flex-direction: column;
      align-items: center;
      &:first-child {
        margin-right: 57px;
      }
      &.active {
        color: #2e92fa;
        font-weight: 500;
      }
      .line-b {
        width: 40px;
        height: 3px;
        background: #2e92fa;
        margin-top: 18px;
        text-align: center;
      }
    }
  }

  .btns-bottom {
    padding-top: 40px;
    .login-btns,
    .register-btns {
      width: 100%;
      height: 53px;
      margin: 0;
      font-size: 18px;
    }
  }
}
.inputs {
  height: 53px;
  font-size: 16px;
}
</style>
