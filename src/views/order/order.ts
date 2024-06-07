import { reactive, ref } from 'vue'
import { tableData } from './orderData'
import type { FormProps } from 'element-plus'
const useOrder = () => {
  const formInline = reactive({
    orderId: '',
    phone: '',
    model: '',
    status: '',
    trackId: '',
    username: '',
    SN: '',
    device: '',
    mode: '',
    breakdown: '',
    date: '',
  })
  const selectIdArr = ref<any>([])
  const status = reactive(['全部', '未处理', '已处理'])
  const currentStatus = ref(0)
  const currentPage = ref(1)
  const pageSize = ref(6)
  const labelPosition = ref<FormProps['labelPosition']>('left')
  const hasCSV = (item: any) => {
    switch (item.payStatus) {
      case 0:
        item.payStatus = '未支付'
        break
      case 1:
        item.payStatus = '已支付'
        break
      default:
        break
    }
    switch (item.status) {
      case 0:
        item.status = '待审核'
        break
      case 1:
        item.status = '待收货(售后部)'
        break
      case 2:
        item.status = '处理中'
        break
      case 3:
        item.status = '测试中'
        break
      case 4:
        item.status = '待寄出'
        break
      default:
        break
    }
    switch (item.fastState) {
      case 0:
        item.fastState = '审核'
        break
      case 1:
        item.fastState = '确认收货'
        break
      case 2:
        item.fastState = '检测报价'
        break
      case 3:
        item.fastState = '维修记录'
        break
      case 4:
        item.fastState = '测试记录'
        break
      default:
        item.fastState = '发货登记'
        break
    }
  }
  // 导出
  const handleExportCSV = () => {
    let a = [
      '订单号',
      '支付状态',
      '处理状态',
      '订单来源',
      '联系人姓名',
      '收货人姓名',
      '收货人手机',
      '淘宝京东订单号',
      '产品型号',
      '快递单号',
      '订单金额',
      '下单时间',
      '审核状态',
    ]
    let csv =
      selectIdArr.value.length > 0
        ? JSON.parse(JSON.stringify(selectIdArr.value)).map((item: any) => {
            hasCSV(item)
            return Object.values(item)
          })
        : JSON.parse(JSON.stringify(tableData)).map((item: any) => {
            hasCSV(item)
            return Object.values(item)
          })
    csv.unshift(a)
    console.log(csv)

    // 构造数据字符，换行需要用\r\n
    let CsvString = csv.map((data: any) => data.join(',')).join('\r\n')
    // 加上 CSV 文件头标识
    CsvString =
      'data:application/vnd.ms-excel;charset=utf-8,\uFEFF' +
      encodeURIComponent(CsvString)
    // 通过创建a标签下载
    const link = document.createElement('a')
    link.href = CsvString
    // 对下载的文件命名
    link.download = `订单列表.csv`
    // 模拟点击下载
    link.click()
    // 移除a标签
    link.remove()
  }
  // 查找
  const handleFindData = () => {
    console.log(formInline)
  }
  // 重置
  const handleReset = () => {
    Object.assign(formInline, {
      orderId: '',
      phone: '',
      model: '',
      status: '',
      trackId: '',
      username: '',
      SN: '',
      device: '',
      mode: '',
      breakdown: '',
      date: '',
    })
  }
  // 选中
  const selectionChange = (value: any) => {
    selectIdArr.value = value
    console.log(selectIdArr.value)
  }
  // 跳转详情
  const goOrderDetail = (item: any) => {
    console.log(item, '跳转详情')
  }
  // 跳转会话
  const goChart = (item: any) => {
    console.log(item, '969696')
  }
  //   切换状态，全部，未处理，已处理
  const handleStatusChange = (status: number) => {
    currentStatus.value = status
  }
  return {
    formInline,
    status,
    currentStatus,
    currentPage,
    pageSize,
    labelPosition,
    handleExportCSV,
    handleFindData,
    handleReset,
    selectionChange,
    goOrderDetail,
    goChart,
    handleStatusChange,
  }
}
export default useOrder
