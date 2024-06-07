<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'
import {
  shortcuts,
  statusOptions,
  repairOptions,
  tableData,
  productData,
} from '../orderData'
import useOrder from '../order'
const {
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
} = useOrder()
</script>

<template>
  <div class="order-box">
    <div class="box-top">
      <el-button type="primary" @click="handleFindData">查询</el-button>
      <el-button type="info" @click="handleReset">重置</el-button>
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
        <el-input
          placeholder="输入工单号"
          v-model="formInline.orderId"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input
          placeholder="输入手机号"
          v-model="formInline.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备型号:">
        <el-input
          placeholder="输入设备型号"
          v-model="formInline.model"
        ></el-input>
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
              <el-icon v-if="formInline.device === data.value" color="#409EFF">
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
            v-for="item in statusOptions"
            :label="item.label"
            :value="item.value"
          >
            <div class="select-option">
              <span>{{ item.label }}</span>
              <el-icon v-if="formInline.status === item.value" color="#409EFF">
                <Check />
              </el-icon>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="快递单号:">
        <el-input
          placeholder="输入快递单号"
          v-model="formInline.trackId"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系人:">
        <el-input
          placeholder="输入联系人姓名"
          v-model="formInline.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备SN号:">
        <el-input
          placeholder="输入设备SN号(机身码)"
          v-model="formInline.SN"
        ></el-input>
      </el-form-item>
      <el-form-item label="维修类型:">
        <el-select
          v-model="formInline.mode"
          placeholder="请选择维修类型"
          clearable
        >
          <el-option
            v-for="item in repairOptions"
            :label="item.label"
            :value="item.value"
          >
            <div class="select-option">
              <span>{{ item.label }}</span>
              <!-- <el-icon v-if="formInline.status === item.value" color="#409EFF">
                <Check />
              </el-icon> -->
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备故障:">
        <el-input
          placeholder="故障原因(检测结果)"
          v-model="formInline.breakdown"
        ></el-input>
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
        @selection-change="selectionChange"
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
          prop="idk"
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
            <el-button
              type="primary"
              link
              class="btns"
              @click="goOrderDetail(row)"
            >
              详情
            </el-button>
            <el-button type="danger" link class="btns">删除</el-button>
            <el-button type="warning" link class="btns">关闭</el-button>
          </template>
        </el-table-column>
        <el-table-column label="快捷" fixed="right" width="100px">
          <template #="{ row }">
            <el-button type="primary" class="btnsk" v-if="row.fastState == 0">
              审核
            </el-button>
            <el-button
              type="primary"
              class="btnsk"
              v-else-if="row.fastState == 1"
            >
              确认收货
            </el-button>
            <el-button
              type="primary"
              class="btnsk"
              v-else-if="row.fastState == 2"
            >
              检测报价
            </el-button>
            <el-button
              type="primary"
              class="btnsk"
              v-else-if="row.fastState == 3"
            >
              维修记录
            </el-button>
            <el-button
              type="primary"
              class="btnsk"
              v-else-if="row.fastState == 4"
            >
              测试记录
            </el-button>
            <el-button type="primary" class="btnsk" v-else>发货登记</el-button>
          </template>
        </el-table-column>
        <el-table-column label="联系客户" fixed="right" width="100px">
          <template #="{ row }">
            <img
              class="chart-img"
              src="@/assets/images/icon-send-chart.png"
              @click="goChart(row)"
            />
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
</template>

<style scoped lang="scss">
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
        padding: 0;
      }
      .btnsk {
        width: 74px;
        background: none;
        color: #409eff;
        padding: 0;
        margin: 0;
        font-weight: 500;
        font-size: 14px;
      }
      .chart-img {
        width: 23px;
        height: 20px;
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
.el-form--inline .el-form-item {
  margin-right: 24px;
}
.el-form--label-left .el-form-item__label {
  color: #303133;
}

.demo-form-inline .el-select {
  --el-select-width: 210px;
}
.custom-tree-select,
.el-input {
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
