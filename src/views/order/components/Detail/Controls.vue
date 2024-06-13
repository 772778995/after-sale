<script setup lang="ts">
import { ref } from 'vue'
import useLayoutSettingStore from '@/stores/modules/setting.ts'
const useSettingStore = useLayoutSettingStore()
const radio = ref('1')
const textarea1 = ref('')
const handleSubmit = () => {
  if (radio.value == '2') {
    useSettingStore.orderDetailPage = !useSettingStore.orderDetailPage
  } else {
    if (useSettingStore.showMode == 0) {
      useSettingStore.showMode = 1
    } else if (useSettingStore.showMode == 1) {
      useSettingStore.showMode = 2
    } else if (useSettingStore.showMode == 2) {
      useSettingStore.showMode = 1
    }
  }
}
</script>

<template>
  <div class="controls-box">
    <!-- 审核 -->
    <div v-if="useSettingStore.showMode == 0">
      <div class="radio-box">
        <p>审核:</p>
        <el-radio-group v-model="radio" class="radio-g">
          <el-radio value="1" size="large">通过</el-radio>
          <el-radio value="2" size="large">不通过</el-radio>
        </el-radio-group>
      </div>
      <div v-if="radio == '2'">
        <el-input
          v-model="textarea1"
          class="no-border"
          :rows="3"
          type="textarea"
          placeholder="请输入原因（必须告知用户为什么不通过）"
        />
      </div>
    </div>
    <!-- 发布报价 -->
    <div v-else-if="useSettingStore.showMode == 1">
      <div class="radio-box">
        <p>报价:</p>
      </div>
    </div>
    <!-- 修改报价 -->
    <div v-else-if="useSettingStore.showMode == 2">
      <div class="radio-box">
        <p>报价:</p>
      </div>
    </div>
    <div class="submit-box" v-if="useSettingStore.showMode == 0">
      <el-button type="primary" size="large" class="btns" @click="handleSubmit">
        提交
      </el-button>
    </div>
    <div class="submit-box" v-else-if="useSettingStore.showMode == 1">
      <el-button type="primary" size="large" class="btns" @click="handleSubmit">
        发布报价
      </el-button>
    </div>
    <div class="submit-box" v-else-if="useSettingStore.showMode == 2">
      <el-button type="primary" size="large" class="btns" @click="handleSubmit">
        修改报价
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.controls-box {
  width: 1421px;
  // height: 150px;
  background: #f5f7fa;
  margin: 0 0 16px 16px;
  .radio-box {
    display: flex;
    height: 53px;
    line-height: 53px;
    p {
      font-weight: 400;
      font-size: 14px;
      color: #071921;
      padding: 0 22px;
    }
    .radio-g {
      .el-radio {
        margin: 0 40px;
      }
    }
  }
  .submit-box {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    .btns {
      width: 140px;
    }
  }
}
.no-border {
  width: 400px;
  background: #ffffff;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px 4px 4px 4px;
  margin-left: 240px;
}
::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #071921;
}
</style>
