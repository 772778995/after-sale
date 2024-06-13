import { defineStore } from 'pinia'
let useLayoutSettingStore = defineStore('settingStore', {
  state: () => {
    return {
      fold: false, //menu菜单栏是否折叠collapse
      headerShow: false, //点击表头设置
      orderDetailPage: false, //点击订单列表，进入详情页面
      showMode: 0, //审核0，维修费用1，修改维修费用2，维修记录3，测试记录4，发货登记5，评价完成6
    }
  },
})
export default useLayoutSettingStore
