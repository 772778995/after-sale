<script setup lang="ts"></script>

<template>
  <ul class="info">
    <li class="info-box">
      <div class="box">
        订单号：
        <span>100010974</span>
      </div>
      <div class="box">
        订单来源:
        <span>个人/经销商</span>
      </div>
      <div class="box">
        下单时间：
        <span>2024-3-23 06:00:00</span>
      </div>
    </li>
    <li class="info-box">
      <div class="box">
        订单处理状态：
        <span>已关闭（子状态）</span>
      </div>
      <div class="box">
        订单类型：
        <span>维修/其他（括号里是用户填写的其他原因）</span>
      </div>
      <div class="box">
        完成时间：
        <span>2024-3-23 07:00:00</span>
      </div>
    </li>
    <li class="info-box bg">
      <div class="box-bg">审核情况</div>
    </li>
    <li class="info-box">
      <div class="box centers">
        审核情况：
        <span>待审核</span>
      </div>
      <div class="box centers">
        审核不通过原因：
        <span>小问题不用修，大问题修不了</span>
      </div>
    </li>
    <li class="info-box bg">
      <div class="box-bg">订单关闭</div>
    </li>
    <li class="info-box">
      <div class="box centers">
        关闭方：
        <span>客户取消</span>
      </div>
      <div class="box centers">
        原因：
        <span>/</span>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.info {
  width: 1421px;
  border: 1px solid #e3e3e3;
  margin-left: 16px;
  .info-box {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e3e3e3;
    &.bg {
      height: 40px;
    }
    &:last-child {
      border: 0;
    }
    .box {
      height: 60px;
      line-height: 60px;
      flex: 1;
      border-right: 1px solid #e3e3e3;
      font-weight: 400;
      font-size: 14px;
      color: #606677;
      padding-left: 22px;
      &.centers {
        text-align: center;
      }
      span {
        color: #303133;
        padding-left: 16px;
      }
      &:last-child {
        border: 0;
      }
    }
    .box-bg {
      text-align: center;
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: #f5f7fa;
      font-weight: 500;
      font-size: 14px;
      color: #303133;
      border-bottom: 1px solid #e3e3e3;
    }
  }
}
</style>
