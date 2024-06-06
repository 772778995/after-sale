import { defineStore } from 'pinia'
let useLayoutSettingStore = defineStore('settingStore', {
  state: () => {
    return {
      fold: false, //menu菜单栏是否折叠collapse
    }
  },
})
export default useLayoutSettingStore
