<script setup lang="ts">
import userList from './user/userList.vue'
import chartHistory from './user/chartHistory.vue'
import memo from './user/memo.vue'
import { TabsPaneContext } from 'element-plus'
import { reactive, ref } from 'vue'
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const tabs = reactive([
  { id: 1, name: 'first', title: '客户资料' },
  { id: 2, name: 'second', title: '客户备忘录' },
  { id: 3, name: 'third', title: '查找聊天记录' },
])
</script>

<template>
  <div class="cart">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane :name="item.name" v-for="item in tabs" :key="item.id">
        <template #label>
          <div class="custom-tabs-label">
            <p>{{ item.title }}</p>
          </div>
        </template>
        <el-scrollbar class="lists">
          <div v-if="item.name == 'first'" class="list-auto">
            <userList />
          </div>
          <div v-if="item.name == 'second'" class="list-auto">
            <memo />
          </div>
          <div v-if="item.name == 'third'" class="list-auto">
            <chartHistory />
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.cart {
  background-color: #fff;
  height: 709px;
  .demo-tabs {
    width: 100%;
    height: 62px;
    font-weight: 400;
    font-size: 16px;
    color: #606677;
    .custom-tabs-label {
      padding-bottom: 22px;
    }
  }
  .lists {
    height: calc(709px - 62px);
    .list-auto {
      width: 344px;
      margin-left: 28px;
    }
  }
}
:deep(.el-form--label-left .el-form-item__label) {
  padding-left: 24px !important;
}
</style>
