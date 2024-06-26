<script setup lang="ts">
import Header from './headerTop/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import useUserStore from '@/stores/modules/user'
import useLayoutSettingStore from '@/stores/modules/setting'
const userStore = useUserStore()
const LayoutSettingStore = useLayoutSettingStore()
</script>

<template>
  <div class="common-layout">
    <Header />
    <el-row class="layout-content">
      <el-col
        :lg="LayoutSettingStore.fold ? 1 : 4"
        :sm="LayoutSettingStore.fold ? 2 : 0"
        :xs="LayoutSettingStore.fold ? 2 : 0"
      >
        <div class="aside">
          <el-scrollbar>
            <Menu :menuList="userStore.menuRoutes" />
          </el-scrollbar>
        </div>
      </el-col>
      <el-col
        :lg="LayoutSettingStore.fold ? 23 : 20"
        :sm="LayoutSettingStore.fold ? 22 : 24"
        :xs="LayoutSettingStore.fold ? 22 : 24"
      >
        <Main />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.common-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .el-header {
    padding: 0;
    height: 90px;
  }
  .layout-content {
    width: 100%;
    display: flex;
    height: calc(100vh - 90px);
    .aside {
      &.fold {
        width: 55px;
      }
    }
    .el-col {
      padding: 0 !important;
      height: calc(100vh - 90px);
    }
  }
}
</style>
