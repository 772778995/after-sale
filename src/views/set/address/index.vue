<script setup lang="ts">
import { Close, Delete, Edit } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { addressOptions } from './address'
import { productData } from '../../order/orderData'
const addressData = reactive([
  {
    title: '缺省地址',
    name: 'MIDIPLUS售后中心',
    phone: '请联系客服',
    area: '',
    address: '请联系客服',
    deviceName: 'BAND、Wind、Wind Pro',
    createTime: '24-01-01 05:58:32',
  },
])
const centerDialogVisible = ref(false)
const formLabelAddress = reactive({
  title: '',
  username: '',
  phone: '',
  area: '',
  address: '',
  device: '',
})
const handleChange = (value: any) => {
  console.log(value)
}
const addAddress = () => {
  centerDialogVisible.value = true
  Object.assign(formLabelAddress, {
    title: '',
    username: '',
    phone: '',
    area: '',
    address: '',
    device: '',
  })
}
const handleEditAddress = (row: any) => {
  console.log(row)
}
</script>

<template>
  <div class="add-btns">
    <el-button type="primary" class="btns" @click="addAddress">添加</el-button>
  </div>
  <el-table
    border
    :cell-style="{ 'text-align': 'center', height: '55px' }"
    :header-cell-style="{
      'text-align': 'center',
      background: ' #F5F7FA',
      color: ' #303133',
    }"
    :data="addressData"
  >
    <el-table-column label="ID" width="70" type="index"></el-table-column>
    <el-table-column label="标题" width="130" prop="title"></el-table-column>
    <el-table-column
      label="收货人姓名"
      width="165"
      prop="name"
    ></el-table-column>
    <el-table-column label="电话" width="135" prop="phone"></el-table-column>
    <el-table-column label="地区" width="160" prop="area"></el-table-column>
    <el-table-column
      label="详情地址"
      width="260"
      prop="address"
    ></el-table-column>
    <el-table-column
      label="关联设备"
      width="230"
      prop="deviceName"
    ></el-table-column>
    <el-table-column
      label="创建时间"
      width="200"
      prop="createTime"
    ></el-table-column>
    <el-table-column label="操作">
      <template #="{ row }">
        <el-button
          type="primary"
          :icon="Edit"
          size="small"
          @click="handleEditAddress(row)"
        >
          编辑
        </el-button>
        <el-button type="danger" :icon="Delete" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="centerDialogVisible"
    width="468"
    align-center
    :show-close="false"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h3 :id="titleId" :class="titleClass">添加</h3>
        <el-icon @click="close"><Close /></el-icon>
      </div>
    </template>
    <el-form label-position="left" :model="formLabelAddress" class="forms">
      <el-form-item label="标题" label-width="110">
        <el-input
          v-model="formLabelAddress.title"
          placeholder="请输入一个方便识别的标题"
        />
      </el-form-item>
      <el-form-item label="收货人姓名" label-width="110">
        <el-input
          v-model="formLabelAddress.username"
          placeholder="请输入维修件收货联系人"
        />
      </el-form-item>
      <el-form-item label="电话" label-width="110">
        <el-input
          v-model="formLabelAddress.phone"
          placeholder="请输入电话号码"
        />
      </el-form-item>
      <el-form-item label="地区" label-width="110">
        <el-cascader
          v-model="formLabelAddress.area"
          :options="addressOptions"
          @change="handleChange"
          class="my-cascader"
          style="width: 290px"
        />
      </el-form-item>
      <el-form-item label="详情地址" label-width="110">
        <el-input
          v-model="formLabelAddress.address"
          placeholder="请输入详细地址"
        />
      </el-form-item>
      <el-form-item label="关联设备" label-width="110">
        <el-cascader
          v-model="formLabelAddress.device"
          :options="productData"
          @change="handleChange"
          class="my-cascader"
          style="width: 290px"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.add-btns {
  width: 100%;
  height: 104px;
  line-height: 104px;
  text-align: right;
  .btns {
    margin-right: 30px;
  }
}
.el-input {
  width: 290px !important;
}
.el-form--label-left .el-form-item__labe {
  padding-left: 20px;
}
.forms {
  padding-left: 20px;
}
.my-header {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  .el-dialog__title {
    flex: 1;
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    color: #303133;
  }
}
</style>
