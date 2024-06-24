<script setup lang="ts">
import { Check, Close } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'

const loginForm = ref({
  login: '',
  verifiable_code: '',
  password: '',
  confirmPassword: '',
})
const showPassword = ref(false)
const showComfirePassword = ref(false)
const visible = ref(false)
const percentage = ref(20)
const iconCloseLen = ref(false)
const iconCheck = ref(false)
const emit = defineEmits(['update-visible'])
let props = defineProps(['dialogVisible'])
watch(
  () => loginForm.value.password,
  (newVal) => {
    console.log(newVal)
    // 使用正则表达式匹配数字和字母
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/
    loginForm.value.password = newVal.trim()
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
const clearDialog = () => {
  showPassword.value = false
  showComfirePassword.value = false
  Object.assign(loginForm.value, {
    login: '',
    verifiable_code: '',
    password: '',
    confirmPassword: '',
  })
}
const handleUpdatePwd = () => {
  clearDialog()
  emit('update-visible')
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
    <el-form class="resetForm">
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
      <el-form-item>
        <el-tooltip placement="right-start" effect="light" :visible="visible">
          <template #content>
            <ul class="ul-content" v-if="loginForm.password.length == 0">
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
            v-model="loginForm.password"
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
      <el-form-item>
        <el-input
          v-model="loginForm.confirmPassword"
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
