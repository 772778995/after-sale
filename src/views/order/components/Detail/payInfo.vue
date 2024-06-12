<script setup lang="ts"></script>

<template>
  <ul class="info">
    <li class="info-li">
      <div class="box">
        支付状态：
        <span>未支付</span>
      </div>
      <div class="box">
        本单维修总计费用：
        <span>￥240.10</span>
      </div>
      <div class="box">
        交易单号：
        <span>20188824926666</span>
      </div>
    </li>
    <li class="info-li bg">
      <div class="box-bg">支付账号</div>
    </li>
    <li class="info-li">
      <div class="box">
        微信账号：
        <span>/</span>
      </div>
      <div class="box">
        支付宝账号：
        <span>1268527422</span>
      </div>
      <div class="box">
        银行账号：
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
  margin-bottom: 40px;
  border: 1px solid #f5f5f5;
  .info-li {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 400;
    font-size: 14px;
    color: #606677;
    border-bottom: 1px solid #e3e3e3;
    &:last-child {
      border: 0;
    }
    &.bg {
      width: 100%;
      height: 40px;
      background: #f5f7fa;
    }
    .box {
      height: 60px;
      line-height: 60px;
      flex: 1;
      border-right: 1px solid #e3e3e3;
      padding-left: 22px;

      span {
        color: #303133;
      }
      &:last-child {
        border: 0;
      }
    }
    .box-bg {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      color: #303133;
    }
  }
}
</style>
