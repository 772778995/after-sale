<script setup lang="ts">
defineProps(['mode'])
</script>

<template>
  <div class="box-address">
    <div class="address-item">
      <div class="item-tips">寄</div>
      <ul class="item-content">
        <li>
          <div class="title">客户姓名：</div>
          <span>张小花</span>
        </li>
        <li>
          <div class="title">客户电话：</div>
          <span>13512345678</span>
        </li>
        <li>
          <div class="title">客户地址：</div>
          <span>北京市北京市昌平区 天通苑南街道中滩村 6号合立方</span>
        </li>
        <li>
          <div class="title">发货状态：</div>
          <span class="status" :class="mode == 'afterSale' ? 'statusC' : ''">
            {{ mode == 'afterSale' ? '已寄出' : '待寄出' }}
          </span>
        </li>
        <li>
          <div class="title">发货时间：</div>
          <span>2024-3-23 06:00:00</span>
        </li>
      </ul>
    </div>
    <img src="@/assets/images/icon-send-jiantou.png" class="icon-jiantou" />
    <div class="address-item">
      <div class="item-tips bg">收</div>
      <ul class="item-content">
        <li>
          <div class="title">客户姓名：</div>
          <span>张小花</span>
        </li>
        <li>
          <div class="title">客户电话：</div>
          <span>13512345678</span>
        </li>
        <li>
          <div class="title">客户地址：</div>
          <span>北京市北京市昌平区 天通苑南街道中滩村 6号合立方</span>
        </li>
        <li>
          <div class="title">发货状态：</div>
          <span class="status" :class="mode == 'afterSale' ? 'statusC' : ''">
            {{ mode == 'afterSale' ? '已确认收货' : '待收货' }}
          </span>
        </li>
        <li>
          <div class="title">发货时间：</div>
          <span>2024-3-23 06:00:00</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box-address {
  padding: 40px 0;
  display: flex;
  align-items: center;
  .address-item {
    width: 263px;
    background: #ffffff;
    border-radius: 4px 4px 4px 33px;
    .item-tips {
      width: 30px;
      height: 30px;
      background: #409eff;
      border-radius: 4px;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      line-height: 30px;
      &.bg {
        background: #303133;
      }
    }
    .item-content {
      padding: 15px;
      li {
        display: flex;
        font-weight: 400;
        font-size: 14px;
        padding: 10px 0;
        .title {
          width: 95px;
          color: #606677;
        }
        span {
          width: 130px;
          color: #303133;
          line-height: 18px;
          &.status {
            color: #06c270;
          }
          &.statusC {
            color: #409eff;
          }
        }
      }
    }
  }
  .icon-jiantou {
    width: 67.22px;
    height: 14.82px;
    margin: 0 23px;
  }
}
</style>
