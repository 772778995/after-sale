<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { reactive, ref, computed } from 'vue'
import { repairOptions } from '../../orderData'
import { v4 as uuid4 } from 'uuid'
import type { UploadProps, UploadUserFile } from 'element-plus'
import useLayoutSettingStore from '@/stores/modules/setting.ts'
const useSettingStore = useLayoutSettingStore()
const textarea = ref()
const radio = ref('1')
const type = ref()
const tableData = reactive<any>([])
const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const addPay = () => {
  let obj = { id: uuid4(), name: '', num: '', money: '' }
  tableData.push(obj)
}

const deletePay = (row: any, index: number) => {
  tableData.forEach((element: any) => {
    if (element.id == row.id) {
      tableData.splice(index, 1)
    }
  })
}
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const totelMoney = computed(() => {
  return tableData.reduce((prev: number, cur: any) => {
    return prev + Number(cur.money)
  }, 0)
})
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
              <img
                src="@/assets/images/icon-play-btns.png"
                class="icons-video"
              />
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
    <li class="title" v-if="useSettingStore.showMode >= 1">
      <p>维修费用</p>
    </li>
    <li v-if="useSettingStore.showMode >= 1">
      <div class="li-pay">
        <div class="name">是否收费：</div>
        <el-radio-group
          v-model="radio"
          class="radio-g"
          :disabled="useSettingStore.showMode == 2 ? true : false"
        >
          <el-radio value="1" size="large">收费</el-radio>
          <el-radio value="2" size="large">不收费</el-radio>
        </el-radio-group>
      </div>
    </li>
    <li v-if="radio == '1' && useSettingStore.showMode >= 1">
      <div class="li-pay">
        <div class="name">费用清单：</div>
        <div class="money">合计：￥{{ totelMoney }}</div>
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
              class="no-borders"
              maxlength="15"
              :disabled="useSettingStore.showMode == 2 ? true : false"
            />
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="num">
          <template #="{ row }">
            <el-input
              v-model="row.num"
              :rows="1"
              type="textarea"
              class="no-borders"
              maxlength="15"
              :disabled="useSettingStore.showMode == 2 ? true : false"
            />
          </template>
        </el-table-column>
        <el-table-column label="金额" prop="money">
          <template #="{ row }">
            <el-input
              v-model="row.money"
              :rows="1"
              type="textarea"
              class="no-borders"
              :disabled="useSettingStore.showMode == 2 ? true : false"
              oninput="value = value
                  .replace(/[^\-\d.]/g, '')
                  .replace(/^\./g, '')
                  .replace(/\.{2,}/g, '.')
                  .replace(/(\.\d+)\./g, '$1')
                  .replace(/(-)\./g, '$1')
                  .replace(/\-{2,}/g, '-')
                  .replace(/(\d+|\.)-/g, '$1')
                  .replace(/-(0){2,}/g, '$1')
                  .replace(/(-)0+(\d+)/g, '$1$2')
                  .replace(/^0+(\d)/, '$1')
                  .replace(/(\d{8})\d*/, '$1')
                  .replace(/(\.\d{2})\d*/, '$1')"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              link
              @click="deletePay(row, $index)"
              :disabled="useSettingStore.showMode == 2 ? true : false"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="add-btn">
        <el-button
          type="primary"
          text
          :icon="Plus"
          @click="addPay"
          :disabled="useSettingStore.showMode == 2 ? true : false"
        >
          添加收费项
        </el-button>
        <el-button
          type="primary"
          text
          :icon="Plus"
          @click="addPay"
          :disabled="useSettingStore.showMode == 2 ? true : false"
        >
          添加优费项
        </el-button>
      </div>
    </li>
    <li class="title" v-if="useSettingStore.showMode >= 3">
      <p>维修记录</p>
    </li>
    <li v-if="useSettingStore.showMode >= 3">
      <div class="service-Info">
        <div class="left-box">
          <div class="name">
            维修工程师:
            <span>工程师-小帅</span>
          </div>
          <div class="status">
            维修状态:
            <span>待维修</span>
          </div>
        </div>
        <div class="type">
          维修类型:
          <el-select v-model="type" placeholder="请选择维修类型" clearable>
            <el-option
              v-for="item in repairOptions"
              :label="item.label"
              :value="item.value"
            >
              <div class="select-option">
                <span>{{ item.label }}</span>
              </div>
            </el-option>
          </el-select>
        </div>
      </div>
    </li>
    <li v-if="useSettingStore.showMode >= 3">
      <div class="service-detail">
        <div class="desc-box">
          <div class="titles">维修描述：</div>
          <el-input
            v-model="textarea"
            :rows="5"
            type="textarea"
            placeholder="请输入维修了什么（非必填）"
          />
        </div>
        <div class="file-box">
          <div class="boxs">
            <div class="titles">维修图片：</div>
            <el-upload
              class="uploadList"
              multiple
              v-model:file-list="fileList"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </div>
          <div class="boxs">
            <div class="titles">维修视频：</div>
            <el-upload
              class="uploadList"
              v-model:file-list="fileList"
              action=""
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <el-icon><Plus /></el-icon>
              <template #file="{ file }">
                <div class="videos">
                  <img class="imgs" :src="file.url" alt="" />
                  <img
                    class="video-imgs"
                    src="@/assets/images/icon-play-btns.png"
                  />
                </div>
              </template>
            </el-upload>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.equipment-box {
  width: 1424px;
  border: 1px solid #e3e3e3;
  margin-left: 16px;
  margin-bottom: 40px;
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
    display: flex;
    .left-box {
      width: 752px;
      display: flex;
      .name,
      .status {
        flex: 0.5;
        border-right: 1px solid #e3e3e3;
        color: #303133;
        margin-left: 21px;
        span {
          color: #606677;
          padding-left: 27px;
        }
      }
    }
    .type {
      flex: 1;
      color: #303133;
      margin-left: 21px;
      display: flex;
      align-items: center;
      .el-select {
        width: 240px;
        margin-left: 27px;
      }
    }
  }
  .service-detail {
    display: flex;
    .desc-box {
      width: 752px;
      border-right: 1px solid #e3e3e3;
      display: flex;
      padding: 13px 0 50px 21px;
      .titles {
        color: #303133;
      }
      .el-textarea {
        width: 440px;
        padding-left: 30px;
      }
    }
    .file-box {
      flex: 1;
      padding: 13px 0 50px 21px;
      color: #303133;
      .boxs {
        display: flex;
        margin-bottom: 15px;
        .titles {
          margin-right: 27px;
        }
        .videos {
          position: relative;
          .imgs {
            width: 60px;
            height: 60px;
          }
          .video-imgs {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
/* 在这里添加上面的CSS样式 */
:deep(.no-border .el-textarea__inner) {
  border: none;
  border-radius: 0;
  box-shadow: none;
}
:deep(.no-borders .el-textarea__inner) {
  border: none;
  border-radius: 0;
  box-shadow: none;
  text-align: center;
}
:deep(.el-radio__input.is-checked + .el-radio__label) {
  color: #071921;
}
:deep(.el-select .el-select__wrapper) {
  background: #f7f7f7;
}
:deep(.el-upload--picture-card) {
  width: 60px;
  height: 60px;
}
:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 60px;
  height: 60px;
}
:deep(.uploadList .el-upload-list__item.is-success:focus:not(:hover)) {
  display: none !important;
}
:deep(.el-upload-list__item.is-success .el-upload-list__item-status-label) {
  display: none !important;
}
</style>
