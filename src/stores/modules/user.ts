import { defineStore } from 'pinia'
import { constantRoute } from '@/router/routes'
let useUserStore = defineStore('User', {
  state: () => {
    return {
      menuRoutes: constantRoute,
      indexPath: '',
      addRouteTag: [] as any,
    }
  },
  actions: {},
  getters: {},
})
export default useUserStore
