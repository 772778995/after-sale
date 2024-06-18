<script setup lang="ts">
import { reactive, ref } from 'vue'
const tabItem = ref([
  { id: 1, title: '当前备忘' },
  { id: 2, title: '已完成' },
])
const currentId = ref(1)
const checkList = ref([])
const checkList1 = ref([])
const changeCurrentTd = (id: number) => {
  currentId.value = id
}
const textarea = ref('')
const lists = reactive([
  {
    value: 1,
    name: '客服小美小美',
    content:
      '这里是记录的备忘内容正文，这里显示全所有的字数，总字数限制300汉字',
  },
  {
    value: 2,
    name: '客服小美1',
    content:
      '1这里是记录的备忘内容正文，这里显示全所有的字数，总字数限制300汉字',
  },
  {
    value: 3,
    name: '客服小美2',
    content:
      '2这里是记录的备忘内容正文，这里显示全所有的字数，总字数限制300汉字',
  },
  {
    value: 4,
    name: '客服小美3',
    content:
      '3这里是记录的备忘内容正文，这里显示全所有的字数，总字数限制300汉字',
  },
])
</script>

<template>
  <div class="tabs-box">
    <div class="tabs" v-for="tab in tabItem" :key="tab.id">
      <el-button
        :class="currentId !== tab.id ? 'tabs-btn' : ''"
        :type="currentId == tab.id ? 'primary' : ''"
        @click="changeCurrentTd(tab.id)"
      >
        {{ tab.title }}
      </el-button>
    </div>
  </div>
  <div class="memo-content">
    <div class="control-box">
      <el-button type="primary" text>
        {{ currentId == 1 ? '完成' : '恢复' }}
      </el-button>
      <el-button type="primary" text>删除</el-button>
    </div>
    <el-scrollbar class="content-box">
      <el-checkbox-group v-model="checkList" v-if="currentId == 1">
        <el-checkbox
          v-for="item in lists"
          :key="item.value"
          :value="item.value"
        >
          <div class="check-box">
            <div class="check-top">
              <img src="@/assets/images/default_unknow@2x.png" />
              <p class="user-name">{{ item.name }}</p>
              <span>2024-05-01 16：32</span>
            </div>
            <p class="check-bottom">{{ item.content }}</p>
          </div>
        </el-checkbox>
      </el-checkbox-group>
      <el-checkbox-group v-model="checkList1" v-if="currentId == 2">
        <el-checkbox
          v-for="item in lists"
          :key="item.value"
          :value="item.value"
        >
          <div class="check-box ac">
            <div class="tag-box">
              <div class="tag">已完成</div>
            </div>
            <div class="check-top">
              <img src="@/assets/images/default_unknow@2x.png" />
              <p class="user-name">{{ item.name }}</p>
              <span>2024-05-01 16：32</span>
            </div>

            <p class="check-bottom">{{ item.content }}</p>
          </div>
        </el-checkbox>
      </el-checkbox-group>
    </el-scrollbar>
  </div>
  <div class="add-record">
    <el-input
      class="no-border"
      maxlength="300"
      v-model="textarea"
      placeholder="请输入内容"
      :rows="3"
      type="textarea"
      show-word-limit
    />
    <div class="add-boxs">
      <el-button type="primary" class="add-btns">添加记录</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs-box {
  height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .tabs-btn {
    border: none;
    background: #f5f5f5;
    color: #606677;
  }
}
.memo-content {
  height: 390px;
  background: rgba(245, 245, 245, 0.5);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .control-box {
    text-align: right;
    .el-button {
      margin: 0;
    }
  }
  .content-box {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    .check-box {
      width: 300px;
      background: #fff;
      border-radius: 4px;
      padding: 16px;
      &.ac {
        padding-top: 0;
        padding-right: 0;
      }
      .check-top {
        font-weight: 400;
        font-size: 14px;
        color: #606677;
        display: flex;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        .user-name {
          padding: 0 10px;
          max-width: 115px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .tag-box {
        margin-bottom: 3px;
        display: flex;
        justify-content: end;
        .tag {
          width: 42px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          background: #409eff;
          border-radius: 0px 4px 0px 4px;
          font-weight: 400;
          font-size: 10px;
          color: #ffffff;
        }
      }
      .check-bottom {
        padding-top: 5px;
        font-weight: 400;
        font-size: 14px;
        color: #303133;
        line-height: 20px;
      }
    }
  }
}
.add-record {
  margin-top: 30px;
  height: 120px;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  .add-boxs {
    text-align: right;
    padding-right: 16px;
    padding-top: 5px;
  }
}
:deep(.el-checkbox) {
  margin-bottom: 10px;
  height: auto;
  margin-right: 0;
  margin-left: 5px;
}
:deep(.el-checkbox__label) {
  white-space: normal; /* 换行 */
}
</style>
