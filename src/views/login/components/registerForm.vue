<script setup lang="ts">
import { reactive, ref } from 'vue'
import useLayoutSettingStore from '@/stores/modules/setting'
import { reqRegisterUser, reqRegisterVerifyCodes } from '@/api/user'
import { ElMessage } from 'element-plus'
const useSettingStore = useLayoutSettingStore()
const registerForm = reactive({
  phone: '',
  verifiable_code: '',
  name: '',
  verifiable_type: 'sms',
  relName: '',
})
const countdown = ref(0)
const intervalId = ref()
const registerFormRef = ref()
const dialogVisible = ref(false)
// 点击直接登录
const handleLoginPage = () => {
  if (dialogVisible.value) {
    useSettingStore.loginStatusShow = true
    dialogVisible.value = false
  } else {
    useSettingStore.loginStatusShow = true
  }
  clearInterval(intervalId.value)
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
const validatorPhone = (rule: any, value: any, callback: any) => {
  console.log(rule)
  if (value.trim().length > 0) {
    if (/^1[3-9]\d{9}$/.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的手机号'))
    }
  } else {
    callback(new Error('手机号码不能为空'))
  }
}
const validatorCodes = (rule: any, value: any, callback: any) => {
  console.log(rule)
  if (value.trim().length > 0) {
    callback()
  } else {
    callback(new Error('验证码不能空'))
  }
}
const validatorName = (rule: any, value: any, callback: any) => {
  console.log(rule)
  if (value.trim().length > 0) {
    if (value.length >= 2) {
      callback()
    } else {
      callback(new Error('长度必需2~12字符'))
    }
  } else {
    callback(new Error('昵称不能为空'))
  }
}
const validatorRelName = (rule: any, value: any, callback: any) => {
  console.log(rule)
  if (value.trim().length > 0) {
    if (value.length >= 2) {
      callback()
    } else {
      callback(new Error('长度必需2~12字符'))
    }
  } else {
    callback(new Error('真实姓名不能为空'))
  }
}
const validatePhoneNumber = (value) => {
  if (registerForm.phone.length > 0) {
    // 如果输入的不是数字或者不是合法的手机号，则重置phoneNumber
    return (registerForm.phone = value.replace(/[^\d]/g, ''))
  }
}
const rules = {
  phone: [{ trigger: 'blur', validator: validatorPhone }],
  verifiable_code: [{ trigger: 'blur', validator: validatorCodes }],
  name: [{ trigger: 'blur', validator: validatorName }],
  relName: [{ trigger: 'blur', validator: validatorRelName }],
}
const startCountdown = async () => {
  await registerFormRef.value.validateField('phone', async (valid) => {
    if (valid) {
      await reqRegisterVerifyCodes({ phone: registerForm.phone })
        .then(() => {
          startTime()
        })
        .catch((err) => {
          ElMessage({
            type: 'error',
            message: err.message,
          })
        })
    }
  })
}
// 点击注册
const handleRegisterBtns = async () => {
  await registerFormRef.value.validate()
  await reqRegisterUser(registerForm)
    .then(() => {
      dialogVisible.value = true
      clearInterval(intervalId.value)
    })
    .catch((err) => {
      ElMessage({
        type: 'error',
        message: err.message?err.message:err[0],
      })
    })
}
</script>

<template>
  <div class="register">
    <p class="title">注册</p>
    <el-form :model="registerForm" ref="registerFormRef" :rules="rules">
      <el-form-item prop="phone">
        <el-input
          v-model="registerForm.phone"
          maxlength="11"
          class="inputs"
          placeholder="请输入手机号"
          @input="validatePhoneNumber"
        />
      </el-form-item>
      <el-form-item prop="verifiable_code">
        <el-input
          v-model="registerForm.verifiable_code"
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
      <el-form-item prop="name">
        <el-input
          v-model="registerForm.name"
          class="inputs"
          placeholder="输入一个亲切的昵称"
        />
      </el-form-item>
      <el-form-item prop="relName">
        <el-input
          v-model="registerForm.relName"
          class="inputs"
          placeholder="请输入您的真实姓名"
        />
      </el-form-item>
    </el-form>
    <div class="btns-bottom">
      <el-button type="primary" class="login-btns" @click="handleRegisterBtns">
        注册
      </el-button>
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
  <el-dialog
    v-model="dialogVisible"
    align-center
    :show-close="false"
    width="700"
  >
    <div class="dialog-content">
      <p class="title">注册成功</p>
      <p class="desc">
        您的手机号已成功注册
        <br />
        请联系管理员为您分配角色后方可登录后台
      </p>
      <el-button type="primary" class="btns" @click="handleLoginPage">
        确定
      </el-button>
    </div>
  </el-dialog>
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
.dialog-content {
  height: 658px;
  .title {
    height: 182px;
    line-height: 182px;
    text-align: center;
    font-weight: 500;
    font-size: 30px;
    color: #000000;
  }
  .desc {
    font-weight: 400;
    font-size: 20px;
    color: #303133;
    text-align: center;
    line-height: 30px;
  }
  .btns {
    width: 426px;
    height: 53px;
    margin: 120px;
    font-weight: 500;
    font-size: 18px;
  }
}
</style>
