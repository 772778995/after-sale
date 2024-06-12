<script setup lang="ts">
defineProps(['mode'])
</script>

<template>
  <div class="box-top">
    <div class="box-item">
      <div class="item">
        <img
          src="@/assets/images/icon-send-shouhou.png"
          class="shouhou"
          v-if="mode == 'afterSale'"
        />
        <img src="@/assets/images/icon-send-kehu.png" class="kehu" v-else />
        <p>待寄件</p>
      </div>
      <img src="@/assets/images/icon-send-line.png" />
    </div>

    <div class="box-item">
      <div class="item">
        <img src="@/assets/images/icon-send-ing.png" class="sending" />
        <p>快递运输中</p>
      </div>
      <img src="@/assets/images/icon-send-line.png" />
    </div>
    <div class="box-item">
      <div class="item">
        <img src="@/assets/images/icon-send-success.png" class="success" />
        <p>已收货</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box-top {
  width: 693px;
  height: 91px;
  background: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
  .box-item {
    display: flex;
    align-items: center;
    .item {
      width: 160px;
      text-align: center;
      .shouhou {
        width: 41px;
        height: 45px;
      }
      .kehu {
        width: 44px;
        height: 40px;
      }
      .sending {
        width: 57px;
        height: 36px;
      }
      .success {
        width: 47px;
        height: 37px;
      }
      p {
        padding-top: 8px;
        font-weight: 400;
        font-size: 14px;
        color: #606677;
      }
    }
    img {
      width: 86px;
      height: 6px;
    }
  }
}
</style>
