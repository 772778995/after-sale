import { defineStore } from 'pinia'
let useUserStore = defineStore('User', {
  state: () => {
    return {
      title: '',
    }
  },
  actions: {
    getName() {
      this.title = 'haha6666'
      console.log(this.title)
    },
  },
  getters: {},
})
export default useUserStore
