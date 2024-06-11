import { defineStore } from 'pinia'
let useLayoutSettingStore = defineStore('settingStore', {
  state: () => {
    return {
      fold: false, //menu菜单栏是否折叠collapse
      headerShow: false, //点击表头设置
      orderDetailPage: false, //点击订单列表，进入详情页面
    }
  },
})
export default useLayoutSettingStore
