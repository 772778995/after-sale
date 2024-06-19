import { defineStore } from 'pinia'
import { constantRoute } from '@/router/routes'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
import { reqGetUserToken, reqGetUsers, reqLogin } from '@/api/user'
import { API_URL, WS_URL } from '@/utils/imURL'
import { getSDK, CbEvents } from 'open-im-sdk-wasm'
const IMSDK = getSDK({
  coreWasmPath: './openIM.wasm',
  sqlWasmPath: '/sql-wasm.wasm',
  debug: true, // false不打印日志
})
console.log(IMSDK, '**************')
let useUserStore = defineStore('User', {
  state: () => {
    return {
      menuRoutes: constantRoute,
      indexPath: '',
      addRouteTag: [] as any,
      token: GET_TOKEN(),
      user: {} as any,
      imToken: {} as any,
    }
  },
  actions: {
    async userLogin(data) {
      await reqLogin(data)
        .then((res) => {
          this.token = `${res.token_type} ${res.access_token}`
          SET_TOKEN(`${res.token_type} ${res.access_token}`)
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
      IMSDK.on(CbEvents.OnConnecting, () => {
        // 连接中
        console.log('连接中----')
      })
      IMSDK.on(CbEvents.OnConnectSuccess, () => {
        console.log('连接成功----')
      })
      IMSDK.on(CbEvents.OnConnectFailed, ({ errCode, errMsg }) => {
        console.log({ errCode, errMsg }, '连接失败状态----')
      })
      IMSDK.on(CbEvents.OnUserTokenExpired, ({ data }) => {
        console.log(data, '连接token过期状态----')
      })

      const config = {
        userID: this.imToken.im_user_id,
        token: this.imToken.im_token,
        platformID: 5,
        apiAddr: API_URL,
        wsAddr: WS_URL,
        logLevel: 5,
      }
      console.log(config)
      IMSDK.login(config)
        .then((e) => {
          // 登录成功
          console.log('登录成功**************', e)
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
    userLogout() {
      this.token = ''
      this.user = {}
      this.imToken = {}
      REMOVE_TOKEN()
      IMSDK.logout()
        .then(() => {
          // 退出登录成功
        })
        .catch(({ errCode, errMsg }) => {
          // 调用失败
          console.log(errCode, errMsg, '退出失败**************')
        })
    },
  },
  getters: {},
})
export default useUserStore
