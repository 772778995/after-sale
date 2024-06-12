<script setup lang="ts">
import { Plus, VideoPlay } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
const textarea = ref()
const radio = ref('1')
const tableData = reactive([])
const obj1 = reactive<any>({ name: '', num: '', money: '' })
const addPay = () => {
  tableData.push(obj1)
}
const deletePay = (index: number) => {
  tableData.splice(index, 1)
  console.log(tableData)
}
</script>

<template>
  <ul class="equipment-box">
    <li class="title">
      <div class="title-tips">
        <img src="@/assets/images/icon-device-tips.png" />
        <span>设备1</span>
      </div>
      <p>设备信息</p>
    </li>
    <li>
      <div class="li-item">
        <p>机身码(SN号)</p>
        <p>设备中文名称</p>
        <p>设备型号</p>
        <p>品牌</p>
        <p>品牌</p>
        <p>售后类型</p>
      </div>
    </li>
    <li>
      <div class="li-item">
        <p class="lic">DW01W231100055</p>
        <p class="lic">万笛电吹管</p>
        <p class="lic">Wind 2</p>
        <p class="lic">MIDIPLUS</p>
        <p class="lic">在保</p>
        <p class="lic">维修/翻新</p>
      </div>
    </li>
    <li class="title">
      <p>购买信息</p>
    </li>
    <li>
      <div class="li-item">
        <p>购买店铺</p>
        <p>购买日期</p>
        <p>设备型号</p>
        <p>凭证截图</p>
      </div>
    </li>
    <li>
      <div class="li-item">
        <p class="lic">MIDIPLIS旗舰店</p>
        <p class="lic">2024-01-01</p>
        <p class="lic">20188824926666</p>
        <p class="liView">查看</p>
      </div>
    </li>
    <li class="title">
      <p>故障信息</p>
    </li>
    <li>
      <div class="li-item-h">
        <p class="title-name">故障描述</p>
        <p class="li-desc">
          故障：C3、C4琴键无响应；喇叭破音；蓝牙连接不稳定，总是掉线。
        </p>
      </div>
    </li>
    <li class="box-file">
      <div class="li-file">
        <div class="file">
          <div class="name">故障图片</div>
          <div class="img-box">
            <img src="@/assets/images/icon-send-kehu.png" alt="" />
            <img src="@/assets/images/icon-send-kehu.png" alt="" />
            <img src="@/assets/images/icon-send-kehu.png" alt="" />
            <img src="@/assets/images/icon-send-kehu.png" alt="" />
            <img src="@/assets/images/icon-send-kehu.png" alt="" />
            <img src="@/assets/images/icon-send-kehu.png" alt="" />
          </div>
        </div>
        <div class="file">
          <div class="name">故障视频</div>
          <div class="video-box">
            <div class="boxs" v-for="item in 5" :key="item">
              <img src="@/assets/images/icon-send-kehu.png" alt="" />
              <el-icon class="icons-video"><VideoPlay /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="title">
      <p>检测结果</p>
    </li>
    <li>
      <el-input
        v-model="textarea"
        :rows="3"
        type="textarea"
        class="no-border"
        placeholder="请输入检测的问题、故障的原因"
      />
    </li>
    <li class="title">
      <p>维修费用</p>
    </li>
    <li>
      <div class="li-pay">
        <div class="name">是否收费：</div>
        <el-radio-group v-model="radio" class="radio-g">
          <el-radio value="1" size="large">收费</el-radio>
          <el-radio value="2" size="large">不收费</el-radio>
        </el-radio-group>
      </div>
    </li>
    <li v-if="radio == '1'">
      <div class="li-pay">
        <div class="name">费用清单：</div>
        <div class="money">合计：￥120</div>
      </div>
      <el-table
        border
        :cell-style="{ 'text-align': 'center' }"
        :header-cell-style="{
          'text-align': 'center',
          background: ' #F5F7FA',
          color: ' #303133',
        }"
        :data="tableData"
      >
        <el-table-column label="收费项" prop="name">
          <template #="{ row }">
            <el-input
              v-model="row.name"
              :rows="1"
              type="textarea"
              class="no-border"
            />
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="num">
          <template #="{ row }">
            <el-input
              v-model="row.num"
              :rows="1"
              type="textarea"
              class="no-border"
            />
          </template>
        </el-table-column>
        <el-table-column label="金额" prop="money">
          <template #="{ row }">
            <el-input
              v-model="row.money"
              :rows="1"
              type="textarea"
              class="no-border"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="primary" link @click="deletePay($index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="add-btn">
        <el-button type="primary" text :icon="Plus" @click="addPay">
          添加收费项
        </el-button>
        <el-button type="primary" text :icon="Plus" @click="addPay">
          添加优费项
        </el-button>
      </div>
    </li>
    <li class="title">
      <p>维修记录</p>
    </li>
    <li>
      <div class="service-Info"></div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.equipment-box {
  width: 1424px;
  border: 1px solid #e3e3e3;
  margin-left: 16px;
  li {
    border-bottom: 1px solid #e3e3e3;
    &:last-child {
      border: 0;
    }
    .li-item {
      height: 60px;
      line-height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        font-weight: 500;
        color: #071921;
        flex: 1;
        text-align: center;
        border-right: 1px solid #e3e3e3;
        &.lic {
          font-weight: 400;
          color: #606677;
        }
        &.liView {
          color: #409eff;
        }
        &:last-child {
          border: 0;
        }
      }
    }
    .li-item-h {
      height: 60px;
      line-height: 60px;
      display: flex;
      align-items: center;
      .title-name {
        width: 102px;
        text-align: center;
        color: #071921;
        border-right: 1px solid #e3e3e3;
      }
      .li-desc {
        color: #606677;
        padding-left: 20px;
      }
    }
  }
  .box-file {
    .li-file {
      height: 100%;
      display: flex;
      .file {
        height: 100%;
        flex: 1;
        border-right: 1px solid #e3e3e3;
        display: flex;
        padding: 12px 0;
        &:last-child {
          border: 0;
        }
        .name {
          flex: 0.2;
          margin: 61px 67px 0 22px;
        }
        .img-box {
          flex: 0.8;
          img {
            width: 118px;
            height: 118px;
            border-radius: 4px;
            margin-left: 8px;
          }
        }
        .video-box {
          flex: 0.8;
          display: flex;
          flex-wrap: wrap;
          .boxs {
            width: 118px;
            height: 118px;
            border-radius: 4px;
            margin-left: 8px;
            position: relative;

            img {
              width: 100%;
              height: 100%;
            }
            .icons-video {
              width: 30px;
              height: 30px;
              background: #797979;

              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
    }
  }
  .title {
    height: 40px;
    background: #f5f7fa;
    display: flex;
    align-items: center;
    position: relative;
    .title-tips {
      width: 82px;
      height: 28px;
      line-height: 28px;
      background: #409eff;
      border-radius: 14px 0px 14px 0px;
      margin-left: 6px;
      img {
        width: 12px;
        height: 10px;
        margin: 0 8px;
      }
      span {
        color: #ffffff;
      }
    }
    p {
      position: absolute;
      margin-left: 612px;
    }
  }
  .li-pay {
    height: 50px;
    line-height: 50px;
    display: flex;
    .name {
      width: 163px;
      padding-left: 22px;
      color: #606677;
    }
    .money {
      color: #409eff;
    }
  }
  .add-btn {
    height: 79px;
    line-height: 79px;
    text-align: right;
    margin-right: 44px;
    .el-button {
      width: 113px;
      height: 40px;
      border: 1px solid #409eff;
    }
  }
  .service-Info {
    height: 50px;
    line-height: 50px;
  }
}
/* 在这里添加上面的CSS样式 */
::v-deep .no-border .el-textarea__inner {
  border: none;
  border-radius: 0;
  box-shadow: none;
  text-align: center;
}
::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #071921;
}
</style>
