import order from '@/assets/images/icon-menu-order.png'
import orderActive from '@/assets/images/icon-menu-order-active.png'
import news from '@/assets/images/icon-menu-news.png'
import newsActive from '@/assets/images/icon-menu-news-active.png'
import set from '@/assets/images/icon-menu-set.png'
import setActive from '@/assets/images/icon-menu-set-active.png'
export const constantRoute = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: '/order',
    meta: {
      title: '订单管理',
      icon: order,
      active: orderActive,
    },
    children: [
      {
        path: '/order',
        component: () => import('@/views/order/list/index.vue'),
        name: 'List',
        meta: {
          title: '订单列表',
        },
      },
    ],
  },
  {
    path: '/news',
    component: () => import('@/layout/index.vue'),
    name: 'News',
    redirect: '/news/chart',
    meta: {
      title: '消息系统',
      icon: news,
      active: newsActive,
    },
    children: [
      {
        path: '/news/chart',
        component: () => import('@/views/news/chat/index.vue'),
        name: 'Chart',
        meta: {
          title: '会话',
        },
      },
      {
        path: '/news/quickMessage',
        component: () => import('@/views/news/quickMessage/index.vue'),
        name: 'quickMessage',
        meta: {
          title: '快捷消息管理',
        },
      },
    ],
  },
  {
    path: '/set',
    component: () => import('@/layout/index.vue'),
    name: 'Set',
    redirect: '/set/personnel',
    meta: {
      title: '系统设置',
      icon: set,
      active: setActive,
    },
    children: [
      {
        path: '/set/personnel',
        component: () => import('@/views/set/personnel/index.vue'),
        name: 'Personnel',
        meta: {
          title: '售后人员管理',
        },
      },
      {
        path: '/set/role',
        component: () => import('@/views/set/role/index.vue'),
        name: 'Role',
        meta: {
          title: '售后角色管理',
        },
      },
      {
        path: '/set/dealer',
        component: () => import('@/views/set/dealer/index.vue'),
        name: 'Dealer',
        meta: {
          title: '经销商人员管理',
        },
      },
      {
        path: '/set/dealerPersonnel',
        component: () => import('@/views/set/dealerPersonnel/index.vue'),
        name: 'DealerPersonnel',
        meta: {
          title: '经销商管理',
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
  },
]
