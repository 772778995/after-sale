import { defineStore } from 'pinia'
import { constantRoute } from '@/router/routes'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
import { reqGetUserToken, reqGetUsers, reqLogin } from '@/api/user'
import { getSDK } from '@/utils/open-im-sdk-wasm'
import useChartStore from './chart'
const IMSDK = getSDK('./openIM.wasm')
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
      const useChart = useChartStore()
      await reqGetUsers()
        .then(async (res: any) => {
          this.user = res
          let result = await reqGetUserToken('5')
          this.imToken = result
          useChart.IMLogin()
        })
        .catch((err) => {
          return Promise.reject(new Error(err.message))
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
