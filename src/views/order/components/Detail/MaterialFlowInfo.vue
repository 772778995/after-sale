<script setup lang="ts">
import MaterialFlowTop from './MaterialFlowTop.vue'
import MaterialFlowAddress from './MaterialFlowAddress.vue'
import { ref } from 'vue'
const inputOrderId = ref()
</script>

<template>
  <div class="materiraial">
    <div class="boxs">
      <MaterialFlowTop />
      <div class="sendOff">
        <p>客户寄出</p>
        <MaterialFlowAddress />
        <div class="content-detail">
          <div class="title">物流详情跟踪</div>
          <el-scrollbar class="content">
            <div class="no-send">
              <p>等待用户登记快递单号</p>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div class="boxs box-afterSale">
      <MaterialFlowTop mode="afterSale" />
      <div class="sendOff">
        <p>售后部寄回</p>
        <MaterialFlowAddress mode="afterSale" />
        <div class="content-detail">
          <div class="title">登记发货</div>
          <el-scrollbar class="content">
            <div class="inputs">
              <el-input
                v-model="inputOrderId"
                style="max-width: 400px"
                placeholder="请输入快递单号"
              >
                <template #append>
                  <div class="search-btn">确认</div>
                </template>
              </el-input>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.materiraial {
  display: flex;
}
.boxs {
  margin-left: 16px;
  &.box-afterSale {
    margin-left: 37px;
  }
  .sendOff {
    width: 694px;
    background: #f7f7f7;
    border-radius: 8px;
    padding: 28px;
    p {
      text-align: center;
      font-weight: 400;
      font-size: 16px;
      color: #000000;
    }
    .content-detail {
      font-weight: 400;
      height: 747px;
      background: #fff;
      border-radius: 4px;
      .title {
        font-size: 16px;
        height: 76px;
        line-height: 76px;
        text-align: center;
        color: #071921;
      }
      .content {
        height: calc(747px - 76px);
        .no-send {
          width: 184px;
          height: 184px;
          background: url('@/assets/images/icon-no-send.png') no-repeat;
          background-size: cover;
          display: flex;
          align-items: end;
          font-size: 14px;
          color: #000000;
          justify-content: end;
          margin: 118px 224px;
        }
        .inputs {
          display: flex;
          align-items: center;
          justify-content: center;

          .search-btn {
            width: 60px;
            text-align: center;
            background: #409eff;
            border-radius: 4px;
            color: #fff;
          }
        }
      }
    }
  }
}
::v-deep .el-input-group__append {
  padding: 0 !important;
}
::v-deep .el-input__wrapper {
  background: #f7f7f7 !important;
}
</style>
