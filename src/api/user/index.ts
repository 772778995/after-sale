import request from '@/utils/request.ts'
import { loginFormData } from './type'

enum API {
  LOGIN_URL = '/auth/login',
  getUserToken_URL = '/im/getUserToken',
  getUsers_URL = '/user',
}
export const reqLogin = (data: loginFormData) => {
  return request.post<any, any>(API.LOGIN_URL, data)
}
export const reqGetUserToken = (platformID: string) => {
  return request.post(API.getUserToken_URL, {
    platformID,
  })
}
export const reqGetUsers = () => {
  return request.get(API.getUsers_URL)
}
