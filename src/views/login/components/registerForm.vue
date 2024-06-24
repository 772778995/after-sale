<script setup lang="ts">
import { reactive } from 'vue'
import useLayoutSettingStore from '@/stores/modules/setting'
const useSettingStore = useLayoutSettingStore()
const registerForm = reactive({
  phone: '',
  verifiable_code: '',
})
const handleLoginPage = () => {
  useSettingStore.loginStatusShow = true
}
</script>

<template>
  <div class="register">
    <p class="title">注册</p>
    <el-form :model="registerForm">
      <el-form-item>
        <el-input
          v-model="registerForm.phone"
          class="inputs"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="registerForm.verifiable_code"
          class="inputs"
          placeholder="请输入验证码"
        >
          <template #append>
            <el-button type="primary" text>获取验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="registerForm.phone"
          class="inputs"
          placeholder="输入一个亲切的昵称"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="registerForm.phone"
          class="inputs"
          placeholder="请输入您的真实姓名"
        />
      </el-form-item>
    </el-form>
    <div class="btns-bottom">
      <el-button type="primary" class="login-btns">登录</el-button>
      <div class="back-box">
        <span>已有账号？</span>
        <el-button
          type="primary"
          link
          class="register-btns"
          @click="handleLoginPage"
        >
          直接登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register {
  padding: 50px;
  .title {
    height: 82px;
    line-height: 82px;
    font-weight: 500;
    font-size: 30px;
    color: #303133;
    margin-bottom: 10px;
  }
  .inputs {
    height: 53px;
    font-size: 16px;
  }
  .btns-bottom {
    padding-top: 40px;

    .login-btns {
      width: 100%;
      height: 53px;
      margin: 0;
      font-size: 18px;
    }
    .back-box {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 53px;
      color: #a9a9af;
      font-size: 18px;
      .register-btns {
        font-size: 18px;
      }
    }
  }
}
</style>
