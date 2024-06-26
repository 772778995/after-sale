import { defineStore } from 'pinia'
import { getSDK } from '@/utils/open-im-sdk-wasm'
import { CbEvents } from '@/utils/open-im-sdk-wasm/constant'
import { reqEmoji, reqGetUsers } from '@/api/user'
import { ConversationItem } from '@/utils/open-im-sdk-wasm/types/entity'
import useUserStore from './user'
import type { ExMessageItem, IAdvancedMessageResponse } from './type'
const IMSDK = getSDK('./openIM.wasm')
import { transformFace } from '@/utils/im'
let useChartStore = defineStore('chart', {
  state: () => {
    return {
      showChartPage: false,
      emojis: [] as any,
      conversationList: [] as ConversationItem[],
      messageList: [] as ExMessageItem[],
      messageObj: {
        lastMinSeq: 0,
        isEnd: false,
      },
      currentConversation: {} as any,
      info: {} as any,
    }
  },
  actions: {
    IMLogin() {
      const useStore = useUserStore()
      IMSDK.on(CbEvents.OnConnecting, () => {
        console.warn('连接中')
      })
      IMSDK.on(CbEvents.OnConnectSuccess, () => {
        console.warn('连接成功')
      })
      IMSDK.on(CbEvents.OnConnectFailed, () => {
        console.warn('连接失败')
      })
      IMSDK.on(CbEvents.OnUserTokenExpired, () => {
        console.warn('token无效')
      })

      IMSDK.login({
        userID: useStore.imToken.im_user_id,
        token: useStore.imToken.im_token,
        platformID: 5,
        apiAddr: 'https://test-mp.midiplus.com/api/v2/im/open_im',
        wsAddr: 'wss://ims.midiplus.com/msg_gateway',
      })
        .then(() => {
          console.log('登录完成')
          this.getAllConversationList()
        })
        .catch(({ errCode, errMsg }) => {
          console.log('登录失败', errCode, errMsg)
        })
    },
    async getEmoji() {
      let res = await reqEmoji()
      this.emojis = res
    },
    getAllConversationList() {
      IMSDK.getConversationListSplit<ConversationItem[]>({
        offset: 0,
        count: 20,
      })
        .then(({ data }) => {
          // 调用成功
          data.forEach((item) => {
            if (JSON.parse(item.latestMsg).textElem) {
              JSON.parse(item.latestMsg).textElem!.content = transformFace(
                JSON.parse(item.latestMsg).textElem?.content,
              )
            }
          })
          this.conversationList = data
          this.getEmoji()
          console.log(this.conversationList, '调用成功1**************')
        })
        .catch(({ errCode, errMsg }) => {
          // 调用失败
          console.log(errCode, errMsg, '调用失败**************')
        })
    },
    handleChartPage(conversation) {
      this.currentConversation = conversation
      console.log(conversation, '****---------------')
      this.showChartPage = true
      IMSDK.getLoginStatus()
        .then(({ data }) => {
          // data: 登录状态LoginStatus
          if (data == 3) {
            this.messageList = []
            this.messageObj = Object.assign(this.messageObj, {
              lastMinSeq: 0,
              isEnd: false,
            })
            this.getMessageList()
            this.getUser(conversation)
          }
        })
        .catch(({ errCode, errMsg }) => {
          // 调用失败
          console.log(errCode, errMsg, '调用失败**************')
        })
    },
    getMessageList() {
      let options = {
        lastMinSeq: this.messageObj.lastMinSeq,
        count: 20,
        startClientMsgID:
          this.messageList.length == 0
            ? ''
            : this.messageList[this.messageList.length - 1].clientMsgID,
        conversationID: this.currentConversation.conversationID,
      }
      console.log(options)
      IMSDK.getAdvancedHistoryMessageList<IAdvancedMessageResponse>(options)
        .then(({ data }) => {
          // 调用成功
          this.messageObj.lastMinSeq = data.lastMinSeq
          data.messageList.forEach((item) => {
            if (item.textElem) {
              item.textElem.content = transformFace(item.textElem?.content)
            }
          })
          this.messageList = [...data.messageList, ...this.messageList]
          console.log(data, this.messageObj, this.messageList, '获取消息成功')
          // this.getChartUserInfo()
        })
        .catch(({ errCode, errMsg }) => {
          // 调用失败
          console.log(errCode, errMsg, '获取消息失败')
        })
    },
    async getUser(conversation) {
      if (conversation.groupID) {
        let str = conversation.groupID.split('_')
        await reqGetUsers(`${str[str.length - 1]}`).then((res) => {
          this.info = res
          console.log(this.info, res, '5656')
        })
      }
    },
  },
  getters: {},
})
export default useChartStore
