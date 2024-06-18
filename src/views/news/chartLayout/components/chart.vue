<script setup lang="ts">
import { ref, reactive } from 'vue'
import userCart from './userCart.vue'
const quickValue = ref('')
const message = reactive([
  {
    value: '1',
    label: '请问还有什么可以帮您',
  },
  {
    value: '2',
    label: '有问题随时找我，本次服务结束，再见！',
  },
  {
    value: '3',
    label: '本次人工服务结束，再见！',
  },
  {
    value: '4',
    label: '您好，请问您的设备型号是什么？',
  },
])
const textarea = ref('')
</script>

<template>
  <div class="chart-contanier">
    <div class="chart-boxs">
      <div class="chart-top">
        <div class="chart-title">芒果补丁仔</div>
        <div class="right">
          <div class="btns">
            <img src="@/assets/images/icon-add-btns.png" class="add-img" />
            <span>邀请加入</span>
          </div>
          <div class="btns">
            <img
              src="@/assets/images/icon--switch-btns.png"
              class="switch-img"
            />
            <span>客户转接</span>
          </div>
          <div class="btns">
            <img src="@/assets/images/icon-close-btns.png" class="close-img" />
            <span>退出接待</span>
          </div>
        </div>
      </div>
      <el-scrollbar class="chart-center">456</el-scrollbar>
      <div class="chart-bottom">
        <div class="top">
          <div class="emo-boxs">
            <img src="@/assets/images/icon-emo-btns.png" />
          </div>
          <div class="pictrue-boxs">
            <img src="@/assets/images/icon-pictrue-btns.png" />
          </div>
          <el-select
            v-model="quickValue"
            placeholder="快捷回复"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in message"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="bottom">
          <el-input
            class="no-border"
            maxlength="300"
            v-model="textarea"
            placeholder="请输入内容"
            :rows="4"
            type="textarea"
          />
          <div class="send-boxs">
            <span>{{ textarea.length }}/300字</span>
            <el-button type="primary">发送</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="user-box">
      <userCart />
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart-contanier {
  width: 100%;
  height: 100%;
  display: flex;
  .chart-boxs {
    flex: 1;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    .chart-top {
      padding: 0 20px;
      height: 50px;
      border-bottom: 1px solid #e3e3e3;
      display: flex;
      justify-content: space-between;
      .chart-title {
        font-weight: 400;
        font-size: 16px;
        color: #000000;
        padding-top: 10px;
        padding-left: 14px;
      }
      .right {
        display: flex;
        .btns {
          width: 112px;
          height: 40px;
          background: #ecf5ff;
          border-radius: 4px;
          border: 1px solid #409eff;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          font-weight: 500;
          font-size: 16px;
          color: #409eff;
          margin-right: 14px;
          cursor: pointer;
          .add-img {
            width: 14px;
            height: 17px;
          }
          .switch-img {
            width: 15px;
            height: 17px;
          }
          .close-img {
            width: 16px;
            height: 15px;
          }
        }
      }
    }
    .chart-center {
      padding: 0 20px;
      flex: 1;
    }
    .chart-bottom {
      height: 196px;
      background-color: #fff;
      margin: 0 20px;
      .top {
        height: 56px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e3e3e3;
        .emo-boxs {
          padding: 0 16px;
          img {
            width: 24px;
            height: 24px;
          }
        }
        .pictrue-boxs {
          padding: 0 34px 0 10px;
          img {
            width: 26px;
            height: 22px;
          }
        }
      }
      .bottom {
        .send-boxs {
          span {
            font-weight: 400;
            font-size: 14px;
            color: #a9a9af;
            padding-right: 11px;
          }
          text-align: right;
          padding-right: 24px;
        }
      }
    }
  }
  .user-box {
    width: 400px;
  }
}
:deep(.no-border .el-textarea__inner) {
  border: none;
  border-radius: 0;
  box-shadow: none;
}
</style>
