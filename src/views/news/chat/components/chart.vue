<script setup lang="ts">
import { ref, reactive, onUpdated, nextTick, onUnmounted, onMounted } from 'vue'
import userCart from './userCart.vue'
import { getSDK } from '@/utils/open-im-sdk-wasm'
import useChartStore from '@/stores/modules/chart'
import useUserStore from '@/stores/modules/user'
import { formatConversionTime } from '@/utils/im'
import type { MessageItem } from '@/utils/open-im-sdk-wasm/types/entity'

const IMSDK = getSDK('./openIM.wasm')
const useChart = useChartStore()
const useStore = useUserStore()
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
const text = ref()

const handleInput = async () => {
  const { data: message } = await IMSDK.createTextMessage<MessageItem>(
    textarea.value,
  )
  message.sessionType = 3
  text.value = message
  console.log(text.value, '我的一条小组---------------')
}
const sendMessage = async () => {
  IMSDK.sendMessage({
    recvID: '', // 接收方ID
    groupID: useChart.currentConversation.groupID
      ? useChart.currentConversation.groupID
      : '', // 群聊ID
    message: text.value, // 要发送的消息体
  })
    .then(({ data: succeedMessage }) => {
      // 发送成功 succeedMessage为发送成功后完整的消息体
      console.log(
        succeedMessage,
        '发送成功 succeedMessage为发送成功后完整的消息体',
      )
      useChart.messageList.push(text.value)
      textarea.value = ''
      useChart.getAllConversationList()
    })
    .catch(({ errCode, errMsg }) => {
      // 发送失败
      console.log(errCode, errMsg, '发送失败')
    })
}

onUpdated(() => {
  nextTick(() => {
    let boxs = document.querySelector('.chart-center')
    boxs!.scrollTo({ top: boxs?.scrollHeight })
  })
})
onUnmounted(() => {
  useChart.showChartPage = false
})

onMounted(async () => {})
// const handleFiles=(event)=> {
//       console.log(event,'33333')
//     }
</script>

<template>
  <div class="chart-contanier">
    <div class="chart-boxs">
      <div class="chart-top">
        <div class="chart-title">
          {{ useChart.currentConversation.showName }}
        </div>
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
      <div class="chart-center">
        <div v-for="message in useChart.messageList" :key="message.clientMsgID">
          <div class="chart-time">
            <p>{{ formatConversionTime(message.sendTime) }}</p>
            <!-- <p v-if="message.notificationElem">
              {{ message.notificationElem.detail }}
            </p> -->
          </div>
          <div
            class="left-bar"
            v-if="message.sendID != useStore.imToken.im_user_id"
          >
            <div class="bar-lt">
              <img :src="message.senderFaceUrl" class="imgs lt" />
            </div>
            <div class="bar-rt">
              <div class="name">{{ message.senderNickname }}</div>
              <div class="content lt">{{ message.textElem?.content }}</div>
            </div>
          </div>

          <div class="right-bar" v-else>
            <div class="bar-lt">
              <div class="name rt">{{ message.senderNickname }}</div>
              <div class="content">
                {{ message.textElem?.content }}
                <img
                  v-if="message.pictureElem"
                  :src="message.pictureElem?.snapshotPicture.url"
                  class="picture"
                />
                <audio
                  v-if="message.soundElem"
                  :src="message.soundElem?.sourceUrl"
                  controls="false"
                ></audio>
                <video
                  v-if="message.videoElem"
                  class="picture"
                  :src="message.videoElem?.videoUrl"
                  controls
                ></video>
              </div>
            </div>
            <div class="bar-rt">
              <img :src="message.senderFaceUrl" class="imgs rt" />
            </div>
          </div>
        </div>
      </div>
      <div class="chart-bottom">
        <div class="top">
          <div class="emo-boxs">
            <img src="@/assets/images/icon-emo-btns.png" />
          </div>
          <div class="pictrue-boxs">
            <!-- <input type="file" @change="handleFiles" multiple> -->
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
            @change="handleInput"
          />
          <div class="send-boxs">
            <span>{{ textarea.length }}/300字</span>
            <el-button type="primary" @click="sendMessage">发送</el-button>
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
      font-weight: 400;
      font-size: 14px;
      color: #606677;
      overflow: auto;
      .chart-time {
        height: 40px;
        line-height: 20px;
        text-align: center;
      }
      .left-bar,
      .right-bar {
        display: flex;
        margin-bottom: 20px;
        justify-content: end;
        .bar-lt,
        .bar-rt {
          .imgs {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            &.lt {
              margin-right: 14px;
            }
            &.rt {
              margin-left: 14px;
            }
          }
          .name {
            padding-bottom: 5px;
            &.rt {
              text-align: right;
            }
          }
          .content {
            font-size: 16px;
            color: #303133;
            background: #d7e8ff;
            padding: 10px 14px;
            border-radius: 4px;
            &.lt {
              background-color: #fff;
            }
            .picture {
              width: 350px;
            }
          }
        }
        // .bar-rt {
        //   img {
        //     width: 40px;
        //     height: 40px;
        //     border-radius: 50%;
        //   }
        // }
      }
      .left-bar {
        justify-content: start;
      }
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
