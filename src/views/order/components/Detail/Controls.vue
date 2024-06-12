<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('1')
const textarea1 = ref('')
</script>

<template>
  <div class="controls-box">
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
</template>

<style scoped lang="scss">
.controls-box {
  width: 1421px;
  height: 150px;
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
