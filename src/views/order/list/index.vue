<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormProps } from 'element-plus'
import { Check } from '@element-plus/icons-vue'
const labelPosition = ref<FormProps['labelPosition']>('left')
const formInline = reactive({
  status: '',
  device: '',
  mode: '',
  date: '',
})
const shortcuts = [
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
const status = reactive(['全部', '未处理', '已处理'])
const currentStatus = ref(0)
const handleStatusChange = (status: number) => {
  currentStatus.value = status
}
const tableData = reactive([
  {
    orderId: '240101001',
    payStatus: 1,
    status: 0,
    origin: '个人',
    name: '张小花',
    nameshou: '张小花1',
    phone: '13512345678',
    mode: 'Wind',
    id: '3878589027481581913',
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
    nameshou: '张小花1',
    phone: '13512345678',
    mode: 'Wind',
    id: '3878589027481581913',
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
    nameshou: '张小花1',
    phone: '13512345678',
    mode: 'Wind',
    id: '3878589027481581913',
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
    nameshou: '张小花1',
    phone: '13512345678',
    mode: 'Wind',
    id: '3878589027481581913',
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
    nameshou: '张小花1',
    phone: '13512345678',
    mode: 'Wind',
    id: '3878589027481581913',
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
    mode: 'Wind',
    id: '3878589027481581913',
    money: '25',
    date: '24-01-01 05:58:32',
    fastState: 5,
  },
])
const currentPage = ref(1)
const pageSize = ref(6)
const productData = reactive([
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
])
const options = [
  {
    value: 'Option1',
    label: '待审核',
  },
  {
    value: 'Option2',
    label: '待寄出',
  },
  {
    value: 'Option3',
    label: '待收货(售后部)',
  },
  {
    value: 'Option4',
    label: '检测中',
  },
  {
    value: 'Option5',
    label: '待缴费',
  },
]
const handleExportCSV = () => {
  let a = [
    '订单号',
    '支付状态',
    '处理状态',
    '订单来源',
    '联系人姓名',
    '收货人姓名',
    '淘宝京东订单号',
    '产品型号',
    '快递单号',
    '订单金额',
    '下单时间',
  ]
  let csv = tableData.map((item) => Object.values(item))
  csv.unshift(a)
  console.log(csv)

  // 构造数据字符，换行需要用\r\n
  let CsvString = csv.map((data) => data.join(',')).join('\r\n')
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
</script>

<template>
  <div class="order-contanier">
    <div class="order-box">
      <div class="box-top">
        <el-button type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
        <el-button type="success" @click="handleExportCSV">导出</el-button>
      </div>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        label-width="auto"
        :label-position="labelPosition"
      >
        <el-form-item label="订单号:">
          <el-input placeholder="输入工单号"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input placeholder="输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="设备型号:">
          <el-input placeholder="输入设备型号"></el-input>
        </el-form-item>
        <el-form-item label="设备分类:">
          <el-tree-select
            class="custom-tree-select"
            v-model="formInline.device"
            :data="productData"
            placeholder="选择设备分类"
            default-expand-all
            clearable
          >
            <template #default="{ node, data }">
              <div class="select-option">
                <span>{{ node.label }}</span>
                <el-icon
                  v-if="formInline.device === data.value"
                  color="#409EFF"
                >
                  <Check />
                </el-icon>
              </div>
            </template>
          </el-tree-select>
        </el-form-item>
        <el-form-item label="订单状态:">
          <el-select
            v-model="formInline.status"
            placeholder="输入订单处理状态"
            clearable
          >
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value"
            >
              <div class="select-option">
                <span>{{ item.label }}</span>
                <el-icon
                  v-if="formInline.status === item.value"
                  color="#409EFF"
                >
                  <Check />
                </el-icon>
              </div>
            </el-option>
            <!-- <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" /> -->
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号:">
          <el-input placeholder="输入快递单号"></el-input>
        </el-form-item>
        <el-form-item label="联系人:">
          <el-input placeholder="输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="设备SN号:">
          <el-input placeholder="输入设备SN号(机身码)"></el-input>
        </el-form-item>
        <el-form-item label="维修类型:">
          <el-select
            v-model="formInline.mode"
            placeholder="请选择维修类型"
            clearable
          >
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备故障:">
          <el-input placeholder="故障原因(检测结果)"></el-input>
        </el-form-item>
      </el-form>
      <div class="box-date">
        <el-date-picker
          v-model="formInline.date"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
        />
      </div>
      <div class="box-table">
        <div class="table-header">
          <div class="btn-group">
            <div
              class="btns-item"
              :class="currentStatus == index ? 'isActive' : ''"
              v-for="(item, index) in status"
              :key="index"
              @click="handleStatusChange(index)"
            >
              {{ item }}
            </div>
          </div>
          <el-button class="btn-plain">表头设置</el-button>
          <el-button class="btn-plain">批量发货</el-button>
          <el-button class="btn-plain">批量通过审核</el-button>
        </div>
        <el-table
          :data="tableData"
          :cell-style="{ 'text-align': 'center', height: '55px' }"
          :header-cell-style="{
            'text-align': 'center',
            background: ' #F5F7FA',
            color: ' #303133',
          }"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column
            label="订单号"
            prop="orderId"
            width="100"
          ></el-table-column>
          <el-table-column label="支付状态" width="100">
            <template #="{ row }">
              <p v-if="row.payStatus == 1" class="pay-status">已支付</p>
              <p v-else class="pay-status no">未支付</p>
            </template>
          </el-table-column>
          <el-table-column label="处理状态" width="120">
            <template #="{ row }">
              <p v-if="row.status == 0" class="state shenhe">待审核</p>
              <p v-else-if="row.status == 1" class="state shouhuo">
                待收货(售后部)
              </p>
              <p v-else-if="row.status == 2" class="state">处理中</p>
              <p v-else-if="row.status == 3" class="state">测试中</p>
              <p v-else class="state jichu">待寄回</p>
            </template>
          </el-table-column>
          <el-table-column
            label="订单来源"
            prop="origin"
            width="100"
          ></el-table-column>
          <el-table-column
            label="联系人姓名"
            prop="name"
            width="100"
          ></el-table-column>
          <el-table-column
            label="收货人姓名"
            prop="nameshou"
            width="100"
          ></el-table-column>
          <el-table-column
            label="收货人手机"
            prop="phone"
            width="130"
          ></el-table-column>
          <el-table-column
            label="淘宝京东订单号"
            width="200"
            prop="id"
          ></el-table-column>
          <el-table-column
            label="产品型号"
            prop="mode"
            width="100"
          ></el-table-column>
          <el-table-column
            label="快递单号"
            prop="id"
            width="200"
          ></el-table-column>
          <el-table-column
            label="订单金额"
            prop="money"
            width="100"
          ></el-table-column>
          <el-table-column
            label="下单时间"
            prop="date"
            width="150"
          ></el-table-column>
          <el-table-column label="订单操作" fixed="right" width="180px">
            <template #="{ row }">
              <el-button type="primary" link class="btns">详情</el-button>
              <el-button type="danger" link class="btns">删除</el-button>
              <el-button type="info" link class="btns">关闭</el-button>
            </template>
          </el-table-column>
          <el-table-column label="快捷" fixed="right" width="80px">
            <template #="{ row }">
              <el-button
                type="primary"
                link
                class="btns"
                v-if="row.fastState == 0"
              >
                审核
              </el-button>
              <el-button
                type="primary"
                link
                class="btns"
                v-else-if="row.fastState == 1"
              >
                确认收货
              </el-button>
              <el-button
                type="primary"
                link
                class="btns"
                v-else-if="row.fastState == 2"
              >
                检测报价
              </el-button>
              <el-button
                type="primary"
                link
                class="btns"
                v-else-if="row.fastState == 3"
              >
                维修记录
              </el-button>
              <el-button
                type="primary"
                link
                class="btns"
                v-else-if="row.fastState == 4"
              >
                测试记录
              </el-button>
              <el-button type="primary" link class="btns" v-else>
                发货登记
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="联系客户" fixed="right" width="100px">
            <template #="{ row }">
              <el-button type="success" link class="btns">发消息</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[6, 12, 24, 30]"
          :background="true"
          layout="->,total, sizes, prev, pager, next, jumper"
          :total="6"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-contanier {
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  .order-box {
    .box-top {
      width: 100%;
      height: 70px;
      line-height: 70px;
      text-align: right;
      .el-button {
        margin-right: 8px;
        &:last-child {
          margin-right: 24px;
        }
      }
    }
    .demo-form-inline {
      margin-left: 24px;
    }
    .box-date {
      text-align: end;
      padding-right: 24px;
    }
    .box-table {
      .table-header {
        display: flex;
        .btn-group {
          width: 222px;
          height: 32px;
          border: 1px solid #e3e3e3;
          border-radius: 4px;
          display: flex;
          align-items: center;
          margin: 0 21px;
          .btns-item {
            width: 74px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            color: #606266;
            border-right: 1px solid #e3e3e3;
            &.isActive {
              border-right: 1px solid #409eff;
              color: #fff;
              background: #409eff;
              &:first-child {
                border-radius: 4px 0 0 4px;
              }
              &:last-child {
                border-radius: 0 4px 4px 0;
              }
            }
            &:last-child {
              border-right: 0;
            }
          }
        }
        .btn-plain {
          border: 1px solid #409eff;
          font-weight: 500;
          font-size: 14px;
          color: #409eff;
          padding: 0 10px;
        }
      }
      .el-table {
        margin: 20px 0;

        .btns {
          border: 0;
          padding: 0;
        }
        .pay-status {
          display: inline-block;
          width: 62px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border-radius: 4px;
          background: #ecf5ff;
          color: #409eff;
          &.no {
            background: #f4f4f5;
            color: #606677;
          }
        }
        .state {
          font-size: 14px;
          color: #606677;
          &.shenhe {
            color: #67c23a;
          }
          &.shouhuo {
            color: #f56c6c;
          }
          &.jichu {
            color: #409eff;
          }
        }
      }
    }
  }
}
.demo-form-inline .el-input {
  --el-input-width: 210px;
}
.el-form--inline .el-form-item {
  margin-right: 24px;
}
.el-form--label-left .el-form-item__label {
  color: #303133;
}
.demo-form-inline .el-select {
  --el-select-width: 210px;
}
.custom-tree-select {
  width: 210px !important;
}
.el-pagination {
  padding: 0 32px 32px 0;
}
.select-option {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
