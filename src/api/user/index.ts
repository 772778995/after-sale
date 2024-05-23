import request from '@/utils/request.ts'

enum API {
  NAVI_URL = '/navi',
}
export const reqNavi = () => {
  return request.get(API.NAVI_URL)
}
