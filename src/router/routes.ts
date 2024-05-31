export const constantRoute = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: '/order',
  },
  {
    path: '/order',
    component: () => import('@/layout/index.vue'),
    name: 'Order',
    redirect: '/order/list',
    children: [
      {
        path: '/order/list',
        componrnt: () => import('@/views/order/list/index.vue'),
        name: 'List',
      },
    ],
  },
  {
    path: '/news',
    component: () => import('@/layout/index.vue'),
    name: 'News',
    redirect: '/news/chart',
    children: [
      {
        path: '/news/chart',
        component: () => import('@/views/news/chat/index.vue'),
        name: 'Chart',
      },
      {
        path: '/news/quickMessage',
        component: () => import('@/views/news/quickMessage/index.vue'),
        name: 'quickMessage',
      },
    ],
  },
  {
    path: '/set',
    component: () => import('@/layout/index.vue'),
    name: 'Set',
    redirect: '/set/personnel',
    children: [
      {
        path: '/set/personnel',
        component: () => import('@/views/set/personnel/index.vue'),
        name: 'Personnel',
      },
      {
        path: '/set/role',
        component: () => import('@/views/set/role/index.vue'),
        name: 'Role',
      },
      {
        path: '/set/dealer',
        component: () => import('@/views/set/dealer/index.vue'),
        name: 'Dealer',
      },
      {
        path: '/set/dealerPersonnel',
        component: () => import('@/views/set/dealerPersonnel/index.vue'),
        name: 'DealerPersonnel',
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
