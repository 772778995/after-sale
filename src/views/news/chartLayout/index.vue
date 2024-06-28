<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import List from './components/list.vue'
import Chart from './components/chart.vue'
const searchContent = ref('')
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const tabs = reactive([
  { id: 1, name: 'first', title: '正在接待', nums: '6' },
  { id: 2, name: 'second', title: '等待接待', nums: '2' },
  { id: 3, name: 'third', title: '历史接待', nums: '3' },
])
onMounted(() => {})
</script>

<template>
  <div class="layout-box">
    <div class="layout-left">
      <div class="search-box">
        <el-input
          v-model="searchContent"
          class="inputs"
          style="width: 320px"
          placeholder="搜索昵称/消息内容"
          :prefix-icon="Search"
        />
      </div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane :name="item.name" v-for="item in tabs" :key="item.id">
          <template #label>
            <div class="custom-tabs-label">
              <p>{{ item.title }}</p>
              <p class="tag-num" v-if="item.nums">({{ item.nums }}人)</p>
            </div>
          </template>
          <el-scrollbar class="lists">
            <List :content="item.title" v-if="activeName == 'first'" />
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="layout-right">
      <Chart />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-box {
  width: 100%;
  height: 709px;
  display: flex;

  .layout-left {
    width: 370px;
    height: 100%;
    .search-box {
      width: 100%;
      height: 86px;
      display: flex;
      align-items: center;
      justify-content: center;
      .inputs {
        height: 40px;
      }
    }
    .demo-tabs {
      width: 100%;
      height: 56px;
      .tag-num {
        color: #606677;
        padding: 10px 0;
      }
    }
    .lists {
      height: 566px;
    }
  }
  .layout-right {
    flex: 1;
    // background-color: pink;
  }
}
:deep(.inputs .el-input__wrapper) {
  background: #f5f5f5 !important;
  border-radius: 20px !important;
  border: none !important;
  box-shadow: none !important;
}
:deep(.el-tabs__header) {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin: 0;
  .el-tabs__nav-wrap {
    width: 100%;
  }
  .el-tabs__item {
    height: 100%;
    text-align: center;
    padding: 0 34px;
    margin: 0;
  }
}
:deep(.el-tabs--top .el-tabs__item.is-top:nth-child(2)) {
  margin: 0 10px;
  margin-left: 20px;
}
</style>
