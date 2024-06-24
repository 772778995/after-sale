import request from '@/utils/request.ts'
import { loginFormData } from './type'

enum API {
  LOGIN_URL = '/auth/login',
  getUserToken_URL = '/im/getUserToken',
  getUsers_URL = '/user',
  emoji_URL = '/emojis',
}
// 用户登录接口
export const reqLogin = (data: loginFormData) => {
  return request.post<any, any>(API.LOGIN_URL, data)
}
// 获取IMTOKEN接口
export const reqGetUserToken = (platformID: string) => {
  return request.post(API.getUserToken_URL, {
    platformID,
  })
}
// 获取用户信息接口
export const reqGetUsers = (id?: string) => {
  if (id) {
    return request.get(API.getUsers_URL + `?id=${id}`)
  } else {
    return request.get(API.getUsers_URL)
  }
}
// 获取emoji表情接口
export const reqEmoji = () => {
  return request.get(API.emoji_URL)
}
