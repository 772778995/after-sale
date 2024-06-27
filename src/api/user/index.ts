import request from '@/utils/request.ts'
import { loginFormData, loginCodesData, registerData } from './type'

enum API {
  LOGIN_URL = '/auth/login',
  getUserToken_URL = '/im/getUserToken',
  getUsers_URL = '/user', //用户信息
  emoji_URL = '/emojis',
  Register_URL = '/users', //用户注册
  isRegisterUser = '/users', //判断电话号码是否注册过
  CODES_URL = '/verifycodes', //已注册获取验证码
  RegisterCodes_URL = '/verifycodes/register', //未注册获取验证码
  RestPassword_URL = '/user/retrieve-password', //重置密码
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
//用户注册
export const reqRegisterUser = (data: registerData) => {
  return request.post(API.Register_URL, data)
}
// 判断用户是否注册过
export const reqIsRegister = (phone: string) => {
  return request.get(API.isRegisterUser + `/+86${phone}`)
}
//获取登录（手机验证码）（已注册）
export const reqVerifyCodes = (data: loginCodesData) => {
  return request.post(API.CODES_URL, data)
}
//获取登录（手机验证码）（未注册）
export const reqRegisterVerifyCodes = (data: loginCodesData) => {
  return request.post(API.RegisterCodes_URL, data)
}
// 重置密码
export const reqRestPassword = (data: registerData) => {
  return request.put(API.RestPassword_URL, data)
}

