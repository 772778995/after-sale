<script setup lang="ts">
import { ref } from 'vue'
const userName = ref('')
</script>

<template>
  <el-form label-width="190" label-position="left">
    <el-form-item label="备注名：">
      <template #="{ row }">
        <el-input
          v-model="userName"
          class="inputName"
          placeholder="精选一个用户名"
        />
        <img class="img-edit" src="@/assets/images/icon-edit-btns.png" />
      </template>
    </el-form-item>
    <el-form-item label="昵称：">张小花</el-form-item>
    <el-form-item label="ID：">525998825</el-form-item>
    <el-form-item label="手机号：">13512345678</el-form-item>
    <el-form-item label="注册时间：">2020-02-15</el-form-item>
    <el-form-item label="最后对话：">2024-05-15 10:17</el-form-item>
  </el-form>
  <div class="cart-list">
    <div class="cart-title">
      <div class="title-line"></div>
      <div class="title">他的维修订单</div>
    </div>
    <ul class="cart-ul">
      <li class="cart-li">
        <p class="li-title">订单号</p>
        <p class="li-content">240101128</p>
      </li>
      <li class="cart-li">
        <p class="li-title">状态</p>
        <p class="li-content">待寄出</p>
      </li>
      <li class="cart-li">
        <p class="li-title">下单日期</p>
        <p class="li-content">2024-01-01</p>
      </li>
      <li class="cart-li">
        <p class="li-title">型号</p>
        <p class="li-content">Routist R2</p>
      </li>
      <li class="cart-li">
        <p class="li-title">序列号</p>
        <p class="li-content">APX0223090003</p>
      </li>
    </ul>
  </div>
  <div class="cart-list warranty">
    <div class="cart-title">
      <div class="title-line line-bg"></div>
      <div class="title">他的保修卡</div>
    </div>
    <ul class="cart-ul">
      <li class="cart-li">
        <p class="li-title">型号</p>
        <p class="li-content">Routist R2</p>
      </li>
      <li class="cart-li">
        <p class="li-title">序列号</p>
        <p class="li-content">APX0223090003</p>
      </li>
      <li class="cart-li">
        <p class="li-title">保修状态</p>
        <p class="li-content">未激活</p>
      </li>
      <li class="cart-li">
        <p class="li-title">保修时间</p>
        <p class="li-content">/</p>
      </li>
      <li class="cart-li">
        <p class="li-title">服务权益</p>
        <p class="li-content">></p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.el-form {
  width: 344px;
  height: 228px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e3e3e3;
  .el-form-item {
    margin-bottom: 0;
    padding-top: 4px;
    color: #303133 !important;
  }
  .inputName {
    width: 98px;
  }
  .img-edit {
    width: 14px;
    height: 15px;
    margin-left: 5px;
  }
}
.cart-list {
  width: 344px;
  height: 276px;
  background: #fbfdff;
  box-shadow:
    inset 0px 4px 0px 0px #409eff,
    0px 2px 21px 0px rgba(203, 210, 222, 0.22),
    0px 0px 4px 0px rgba(203, 210, 222, 0.44);
  border-radius: 8px;
  margin-top: 20px;
  padding-left: 21px;
  &.warranty {
    box-shadow:
      inset 0px 4px 0px 0px #6ee29a,
      0px 2px 21px 0px rgba(203, 210, 222, 0.22),
      0px 0px 4px 0px rgba(203, 210, 222, 0.44);
  }
  .cart-title {
    font-weight: 500;
    font-size: 16px;
    color: #303133;
    display: flex;
    align-items: center;
    padding: 22px 0 0 0;
    .title-line {
      width: 3px;
      height: 12px;
      background: #409eff;
      margin-right: 18px;
      &.line-bg {
        background: #6ee29a;
      }
    }
  }
  .cart-ul {
    .cart-li {
      width: 100%;
      height: 45px;
      display: flex;
      align-items: center;
      .li-title {
        flex: 0.5;
        color: #606677;
      }
      .li-content {
        flex: 0.5;
        padding-left: 15px;
        color: #303133;
      }
    }
  }
}
:deep(.inputName .el-input__wrapper) {
  background-color: #fff;
  border: none !important;
  box-shadow: none !important;
  padding: 0;
  color: #303133;
}
</style>
