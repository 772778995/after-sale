export const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
export const statusOptions = [
  {
    value: '0',
    label: '待审核',
  },
  {
    value: '1',
    label: '待寄出',
  },
  {
    value: '2',
    label: '待收货(售后部)',
  },
  {
    value: '3',
    label: '检测中',
  },
  {
    value: '4',
    label: '待缴费',
  },
  {
    value: '5',
    label: '处理中',
  },
  {
    value: '6',
    label: '测试中',
  },
  {
    value: '7',
    label: '待寄回',
  },
  {
    value: '8',
    label: '待收货(客户）',
  },
  {
    value: '9',
    label: '已完成',
  },
  {
    value: '10',
    label: '已评价',
  },
  {
    value: '11',
    label: '已关闭',
  },
]
export const repairOptions = [
  {
    value: '0',
    label: '7天无理由退货',
  },
  {
    value: '1',
    label: '产品质量问题',
  },
  {
    value: '2',
    label: '无故障',
  },
  {
    value: '3',
    label: '其他',
  },
]
export const tableData = [
  {
    orderId: '240101001',
    payStatus: 1,
    status: 0,
    origin: '个人',
    name: '张小花',
    nameshou: '张小花1',
    phone: '13512345678',
    id: '3878589027481581913',
    mode: 'Wind',
    idk: '3878589027481581913',
    money: '25',
    date: '24-01-01 05:58:32',
    fastState: 0,
  },
  {
    orderId: '240101001',
    payStatus: 0,
    status: 1,
    origin: '个人',
    name: '张小花',
    nameshou: '张小花2',
    phone: '13512345678',
    id: '3878589027481581913',
    mode: 'Wind',
    idk: '3878589027481581913',
    money: '25',
    date: '24-01-01 05:58:32',
    fastState: 1,
  },
  {
    orderId: '240101001',
    payStatus: 0,
    status: 2,
    origin: '个人',
    name: '张小花',
    nameshou: '张小花3',
    phone: '13512345678',
    id: '3878589027481581913',
    mode: 'Wind',
    idk: '3878589027481581913',
    money: '25',
    date: '24-01-01 05:58:32',
    fastState: 2,
  },
  {
    orderId: '240101001',
    payStatus: 1,
    status: 3,
    origin: '个人',
    name: '张小花',
    nameshou: '张小花4',
    phone: '13512345678',
    id: '3878589027481581913',
    mode: 'Wind',
    idk: '3878589027481581913',
    money: '25',
    date: '24-01-01 05:58:32',
    fastState: 3,
  },
  {
    orderId: '240101001',
    payStatus: 1,
    status: 4,
    origin: '个人',
    name: '张小花',
    nameshou: '张小花5',
    phone: '13512345678',
    id: '3878589027481581913',
    mode: 'Wind',
    idk: '3878589027481581913',
    money: '25',
    date: '24-01-01 05:58:32',
    fastState: 4,
  },
  {
    orderId: '240101001',
    payStatus: 0,
    status: 2,
    origin: '个人',
    name: '张小花',
    nameshou: '张小花1',
    phone: '13512345678',
    id: '3878589027481581913',
    mode: 'Wind',
    idk: '3878589027481581913',
    money: '25',
    date: '24-01-01 05:58:32',
    fastState: 5,
  },
]
export const productData = [
  {
    value: '1',
    label: '吹管',
    children: [
      {
        value: '1-1',
        label: '主产品',
      },
      {
        value: '1-2',
        label: '周边',
      },
    ],
  },
  {
    value: '2',
    label: '控制器',
    children: [
      {
        value: '2-1',
        label: '服务',
      },
    ],
  },
]
export const headerDate = [
  {
    id: 'A01',
    name: '用户DI',
    sort: '用户信息',
  },
  {
    id: 'A02',
    name: '用户DI',
    sort: '用户信息',
  },
  {
    id: 'A03',
    name: '用户DI',
    sort: '用户信息',
  },
]
