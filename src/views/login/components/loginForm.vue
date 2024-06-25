<script setup lang="ts">
import { ref, reactive } from 'vue'
import useLayoutSettingStore from '@/stores/modules/setting'
import ResetPwd from './resetPwd.vue'
import { WarningFilled } from '@element-plus/icons-vue'
import useUserStore from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
import {
  reqIsRegister,
  reqVerifyCodes,
  reqRegisterVerifyCodes,
} from '@/api/user'
let $router = useRouter()
let $route = useRoute()
const useSettingStore = useLayoutSettingStore()
const useStore = useUserStore()
const centerDialogVisible = ref(false)
const tabItem = reactive(['账号密码登录', '验证码登录'])
const currentTab = ref(0)
const loginForm = ref({
  login: '',
  password: '',
})
const loginCodesForm = ref({
  login: '',
  verifiable_code: '',
})
const loginFormRef = ref()
const loginFormCodesRef = ref()
const IconError = ref(false)
const errorMessage = ref()
const countdown = ref(0)
const intervalId = ref()
const loading = ref(false)
// 切换tabs
const switchTab = (index: number) => {
  currentTab.value = index
  countdown.value = 0
  IconError.value = false
  errorMessage.value = ''
  clearInterval(intervalId.value)
  Object.assign(loginForm.value, {
    login: '',
    password: '',
  })
  Object.assign(loginCodesForm.value, {
    login: '',
    verifiable_code: '',
  })
}
// 切换注册页面
const switchRegisterPage = () => {
  useSettingStore.loginStatusShow = false
}
// 点击忘记密码
const handeleForgetPwd = () => {
  centerDialogVisible.value = !centerDialogVisible.value
  console.log(centerDialogVisible.value)
}
const validatorLogin = (rule: any, value: any, callback: any) => {
  console.log(rule,typeof value === 'string')
  if (value?.toString().trim().length > 0) {
    if (/^1[3-9]\d{9}$/.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的手机号'))
    }
  } else {
    callback(new Error('手机号码不能为空'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  console.log(rule)
  if (value.trim().length > 0) {
    callback()
  } else {
    callback(new Error('密码不能为空'))
  }
}
const validatorCodes = (rule: any, value: any, callback: any) => {
  console.log(rule)
  if (value.trim().length > 0) {
    callback()
  } else {
    callback(new Error('验证码不能为空'))
  }
}
// 规则
const rulesForm = {
  login: [{ trigger: 'blur', validator: validatorLogin }],
  password: [{ trigger: 'blur', validator: validatorPassword }],
}
const validatePhoneNumber = (value) => {
  if (loginForm.value.login.length > 0) {
    // 如果输入的不是数字或者不是合法的手机号，则重置phoneNumber
    return (loginForm.value.login = value.replace(/[^\d]/g, ''))
  }
  if (loginCodesForm.value.login.length > 0) {
    // 如果输入的不是数字或者不是合法的手机号，则重置phoneNumber
    return (loginCodesForm.value.login = value.replace(/[^\d]/g, ''))
  }
}
const rulesFormCodes = {
  login: [{ trigger: 'blur', validator: validatorLogin }],
  verifiable_code: [{ trigger: 'blur', validator: validatorCodes }],
}
const startTime = () => {
  countdown.value = 60 // 假设验证码有效期是60秒
  intervalId.value = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(intervalId.value)
    }
  }, 1000)
}
//获取验证码
const startCountdown = async () => {
  await loginFormCodesRef.value.validateField('login', async (valid) => {
    if (valid) {
      await reqIsRegister(loginCodesForm.value.login)
        .then(async () => {
          await reqVerifyCodes({
            phone: `+86${loginCodesForm.value.login}`,
          })
            .then((res) => {
              startTime()
              console.log('获取成功', res)
            })
            .catch((err) => {
              ElMessage({
                type: 'error',
                message: err.message,
              })
            })
        })
        .catch(async () => {
          await reqRegisterVerifyCodes({
            phone: `+86${loginCodesForm.value.login}`,
          })
            .then((res) => {
              startTime()
              console.log('获取成功', res)
            })
            .catch((err) => {
              ElMessage({
                type: 'error',
                message: err.message,
              })
            })
        })
    }
  })
}
// 登录按钮
const handleLoginBtns = async () => {
  currentTab.value == 0
    ? await loginFormRef.value.validate()
    : await loginFormCodesRef.value.validate()
  loading.value = true
  useStore
    .userLogin(currentTab.value == 0 ? loginForm.value : loginCodesForm.value)
    .then(() => {
      IconError.value = false
      let redirect: any = $route.query.redirect
      $router.push({ path: redirect || '/' })
      ElNotification({
        type: 'success',
        message: '登录成功',
      })
      loading.value = false
    })
    .catch((error) => {
      loading.value = false
      IconError.value = true
      errorMessage.value = error.message
    })
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
    <div class="error-boxs" v-show="IconError">
      <span class="icon-error">
        <el-icon><WarningFilled /></el-icon>
      </span>
      <p>{{ errorMessage }}</p>
    </div>
    <el-form
      :model="loginForm"
      ref="loginFormRef"
      :rules="rulesForm"
      v-if="currentTab != 1"
    >
      <el-form-item prop="login">
        <el-input
          v-model.number="loginForm.login"
          maxlength="11"
          class="inputs"
          placeholder="请输入手机号"
          @input="validatePhoneNumber"
        />
      </el-form-item>
      <el-form-item prop="password">
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
    <el-form
      :model="loginCodesForm"
      ref="loginFormCodesRef"
      :rules="rulesFormCodes"
      v-else
    >
      <el-form-item prop="login">
        <el-input
          v-model="loginCodesForm.login"
          maxlength="11"
          class="inputs"
          placeholder="请输入手机号"
          @input="validatePhoneNumber"
        />
      </el-form-item>
      <el-form-item prop="verifiable_code">
        <el-input
          v-model="loginCodesForm.verifiable_code"
          class="inputs"
          placeholder="请输入验证码"
        >
          <template #append>
            <el-button
              type="primary"
              text
              :disabled="countdown > 0"
              @click="startCountdown"
            >
              {{ countdown > 0 ? `${countdown}S后重新发` : '获取验证码' }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="btns-bottom">
      <el-button
        type="primary"
        class="login-btns"
        :loading="loading"
        @click="handleLoginBtns"
      >
        登录
      </el-button>
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
  <ResetPwd
    :dialogVisible="centerDialogVisible"
    @update-visible="handeleForgetPwd"
  />
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
.error-boxs {
  color: #f56c6c;
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  .icon-error {
    margin-right: 5px;
  }
}
</style>
