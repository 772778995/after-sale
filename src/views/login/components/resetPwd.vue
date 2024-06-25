<script setup lang="ts">
import { reqRestPassword } from '@/api/user'
import { reqVerifyCodes } from '@/api/user'
import { Check, Close } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'

const passwordForm = ref({
  phone: '',
  verifiable_code: '',
  password: '',
  confirmPassword: '',
  verifiable_type: 'sms',
})
const countdown = ref(0)
const intervalId = ref()
const resetFormRef = ref()
const showPassword = ref(false)
const showComfirePassword = ref(false)
const visible = ref(false)
const percentage = ref(20)
const iconCloseLen = ref(false)
const iconCheck = ref(false)
const emit = defineEmits(['update-visible'])
let props = defineProps(['dialogVisible'])
watch(
  () => passwordForm.value.password,
  (newVal) => {
    console.log(newVal)
    // 使用正则表达式匹配数字和字母
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/
    passwordForm.value.password = newVal.trim()
    if (newVal.length >= 8) {
      if (regex.test(newVal)) {
        percentage.value = 100
        iconCheck.value = true
        iconCloseLen.value = true
      } else {
        percentage.value = 60
        iconCloseLen.value = true
        iconCheck.value = false
      }
    } else {
      iconCheck.value = false
      iconCloseLen.value = false
      percentage.value = 20
    }
  },
)

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
const validatorPassword = (rule: any, value: any, callback: any) => {
  console.log(rule)
  if (value.trim().length > 0) {
    if (value.length >= 8) {
      callback()
    } else {
      callback(new Error('至少长度8~14个字符'))
    }
  } else {
    callback(new Error('密码不能空'))
  }
}
const validatorConfirmPassword = (rule: any, value: any, callback: any) => {
  console.log(rule)
  if (value.trim().length > 0) {
    if (passwordForm.value.password == value) {
      callback()
    } else {
      callback(new Error('前后输入密码不一致'))
    }
  } else {
    callback(new Error('密码不能空'))
  }
}
const rules = {
  phone: [{ trigger: 'blur', validator: validatorPhone }],
  verifiable_code: [{ trigger: 'blur', validator: validatorCodes }],
  password: [{ trigger: 'blur', validator: validatorPassword }],
  confirmPassword: [{ trigger: 'blur', validator: validatorConfirmPassword }],
}
const validatePhoneNumber = (value) => {
  if (passwordForm.value.phone.length > 0) {
    // 如果输入的不是数字或者不是合法的手机号，则重置phoneNumber
    return (passwordForm.value.phone = value.replace(/[^\d]/g, ''))
  }
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
const startCountdown = async () => {
  await resetFormRef.value.validateField('phone', async (valid) => {
    if (valid) {
      await reqVerifyCodes({ phone: passwordForm.value.phone })
        .then(() => {
          startTime()
        })
        .catch((err) => {
          ElMessage({
            type: 'error',
            message: err.message ? err.message : err[0],
          })
        })
    }
  })
}
const clearDialog = () => {
  showPassword.value = false
  showComfirePassword.value = false
  clearInterval(intervalId.value)
  Object.assign(passwordForm.value, {
    phone: '',
    verifiable_code: '',
    password: '',
    confirmPassword: '',
    verifiable_type: 'sms',
  })
}
const handleUpdatePwd = async () => {
  await resetFormRef.value.validate()
  await reqRestPassword(passwordForm.value)
    .then(() => {
      ElMessage({
        type: 'success',
        message: '重置成功',
      })
      clearDialog()
      emit('update-visible')
    })
    .catch((err) => {
      console.log(err)
      ElMessage({
        type: 'error',
        message: err.message ? err.message : err[0],
      })
    })
}
</script>

<template>
  <el-dialog
    v-model="props.dialogVisible"
    width="700"
    align-center
    :show-close="false"
    class="my-dialog-pwd"
    @close="clearDialog"
  >
    <template #header>
      <h1 class="dialog-title">重置密码</h1>
    </template>
    <el-form
      class="resetForm"
      :model="passwordForm"
      ref="resetFormRef"
      :rules="rules"
    >
      <el-form-item prop="phone">
        <el-input
          v-model="passwordForm.phone"
          maxlength="11"
          class="inputs"
          placeholder="请输入手机号"
          @input="validatePhoneNumber"
        />
      </el-form-item>
      <el-form-item prop="verifiable_code">
        <el-input
          v-model="passwordForm.verifiable_code"
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
      <el-form-item prop="password">
        <el-tooltip placement="right-start" effect="light" :visible="visible">
          <template #content>
            <ul class="ul-content" v-if="passwordForm.password.length == 0">
              <li>请至少输入8个字符，并包含字母、数字。</li>
              <li>请不要使用容易被猜到的密码。</li>
            </ul>
            <div class="demo-progress" v-else>
              <p
                class="progress-title"
                :class="
                  percentage == 60
                    ? 'warning'
                    : percentage == 100
                      ? 'success'
                      : ''
                "
              >
                强度：{{
                  percentage == 20 ? '低' : percentage == 60 ? '中' : '高'
                }}
              </p>
              <el-progress
                :text-inside="true"
                :stroke-width="10"
                :percentage="percentage"
                :status="
                  percentage == 20
                    ? 'exception'
                    : percentage == 60
                      ? 'warning'
                      : 'success'
                "
              >
                <span></span>
              </el-progress>
              <ul>
                <li>
                  <el-icon color="#F56C6C" :size="16" v-if="!iconCloseLen">
                    <Close />
                  </el-icon>
                  <el-icon color="#06C270" :size="16" v-else><Check /></el-icon>
                  <span>长度为8~14个字符</span>
                </li>
                <li>
                  <el-icon color="#F56C6C" :size="16" v-if="!iconCheck">
                    <Close />
                  </el-icon>
                  <el-icon color="#06C270" :size="16" v-else><Check /></el-icon>
                  <span>同时包含字母和数字组合</span>
                </li>
              </ul>
            </div>
          </template>
          <el-input
            v-model="passwordForm.password"
            maxlength="14"
            class="inputs"
            placeholder="请输入新密码"
            :type="!showPassword ? 'password' : 'text'"
            @focus="visible = true"
            @blur="visible = false"
          >
            <template #append>
              <img
                src="@/assets/images/icon-pwd-close.png"
                class="icon-close"
                v-if="!showPassword"
                @click="showPassword = true"
              />
              <img
                src="@/assets/images/icon-pwd-show.png"
                class="icon-close"
                v-else
                @click="showPassword = false"
              />
            </template>
          </el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input
          v-model="passwordForm.confirmPassword"
          class="inputs"
          placeholder="确认密码"
          :type="!showComfirePassword ? 'password' : 'text'"
        >
          <template #append>
            <img
              src="@/assets/images/icon-pwd-close.png"
              class="icon-close"
              v-if="!showComfirePassword"
              @click="showComfirePassword = true"
            />
            <img
              src="@/assets/images/icon-pwd-show.png"
              class="icon-close"
              v-else
              @click="showComfirePassword = false"
            />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button type="primary" @click="handleUpdatePwd" class="btns">
        确定重置
      </el-button>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.my-dialog-pwd {
  .dialog-title {
    font-weight: 500;
    font-size: 30px;
    color: #303133;
    text-align: center;
    padding: 60px 0 30px 0;
  }
  .resetForm,
  .dialog-footer {
    padding: 0 137px;
    .icon-close {
      width: 20px;
      height: 20px;
    }
    .btns {
      width: 100%;
      height: 53px;
      font-size: 18px;
      margin: 30px 0 80px 0;
    }
  }
}
.el-popper.is-light {
  .ul-content {
    width: 272px;
    height: 136px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 34px;
    list-style: disc;
    li {
      font-weight: 400;
      font-size: 14px;
      color: #606677;
      width: 200px;
      padding-bottom: 5px;
    }
  }
  .demo-progress {
    width: 272px;
    height: 136px;
    padding-left: 16px;
    .progress-title {
      font-weight: 400;
      font-size: 14px;
      color: #f56c6c;
      padding: 16px 0 5px 0;
      &.warning {
        color: #e6a23c;
      }
      &.success {
        color: #06c270;
      }
    }
    li {
      font-weight: 400;
      font-size: 14px;
      color: #606677;
      display: flex;
      align-items: center;
      padding-top: 13px;
      &:first-child {
        padding-top: 16px;
      }
      span {
        padding-left: 9px;
      }
    }
  }
}
.inputs {
  height: 53px;
  font-size: 16px;
}
</style>
