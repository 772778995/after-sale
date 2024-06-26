import router from '@/router'
import nprogress from 'nprogress'
import pinia from './stores'
import useUserStore from '@/stores/modules/user'
const useStore = useUserStore(pinia)
nprogress.configure({ showSpinner: false })
// 全局前置守卫[项目当中任意路由切换都回触发的钩子]
router.beforeEach(async (to, from, next) => {
  console.log(from)
  // to :你将要访问那个路由
  // from:你从那个路由而来
  // next：路由的放行函数
  nprogress.start()
  let token = useStore.token
  //   获取用户的名字
  let user = useStore.user
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (Object.keys(user).length != 0) {
        next()
      } else {
        // 没有用户名字，就发请求获取用户信息，成功了在放行
        await useStore
          .userInfo()
          .then(() => {
            // 万一：刷新的时候是异步路由，有可能获取到用户信息，异步路由还没有加载完毕，会出现空白效果
            next({ ...to })
          })
          .catch(async (err) => {
            console.error(err)
            // token 过期  退出登录
            // 用户手动更改token
            useStore.userLogout()
            next({ path: '/login' })
          })
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  console.log(to, from)
  nprogress.done()
})
