import { defineStore } from 'pinia'
import { constantRoute } from '@/router/routes'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
import { reqGetUserToken, reqGetUsers, reqLogin } from '@/api/user'
import { getSDK } from 'open-im-sdk-wasm'
const IMSDK = getSDK()
const API_URL = 'https://test-mp.midiplus.com/api/v2/im/open_im'
const WS_URL = 'wss://ims.midiplus.com/msg_gateway'
let useUserStore = defineStore('User', {
  state: () => {
    return {
      menuRoutes: constantRoute,
      indexPath: '',
      addRouteTag: [] as any,
      token_type: '',
      token: GET_TOKEN(),
      user: {} as any,
      imToken: {} as any,
      operationID: '',
    }
  },
  actions: {
    async userLogin(data) {
      await reqLogin(data)
        .then((res) => {
          this.token_type = res.token_type
          this.token = res.access_token
          SET_TOKEN(res.access_token)
          return 'ok'
        })
        .catch((err) => {
          return Promise.reject(new Error(err.message))
        })
    },
    async userInfo() {
      await reqGetUsers()
        .then(async (res: any) => {
          this.user = res
          let result = await reqGetUserToken('5')
          this.imToken = result
          this.getIMLogin()
        })
        .catch((err) => {
          return Promise.reject(new Error(err.message))
        })
    },
    getIMLogin() {
      const config = {
        userID: this.imToken.im_user_id,
        token: this.imToken.im_token,
        platformID: 5,
        apiAddr: API_URL,
        wsAddr: WS_URL,
      }
      IMSDK.login(config)
        .then(() => {
          this.getAllConversationList()
          // 登录成功
          console.log('登录成功**************')
        })
        .catch(({ errCode, errMsg }) => {
          // 登录失败
          console.log(errCode, errMsg, '登录失败**************')
        })
    },
    getAllConversationList() {
      IMSDK.getAllConversationList()
        .then(({ data }) => {
          // 调用成功
          console.log(data, '调用成功**************')
        })
        .catch(({ errCode, errMsg }) => {
          // 调用失败
          console.log(errCode, errMsg, '调用失败**************')
        })
    },
  },
  getters: {},
})
export default useUserStore
