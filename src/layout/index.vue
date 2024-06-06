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
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container class="layout-content">
        <el-aside :class="LayoutSettingStore.fold ? 'fold' : ''">
          <el-scrollbar>
            <Menu :menuList="userStore.menuRoutes" />
          </el-scrollbar>
        </el-aside>
        <el-main>
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.common-layout {
  width: 100vw;
  height: 100vh;
  .el-header {
    padding: 0;
    height: 90px;
  }
  .layout-content {
    height: calc(100vh - 90px);
    .el-aside {
      width: 286px;
      height: inherit;
      &.fold {
        width: 55px;
      }
    }
    .el-main {
      padding: 0;
    }
  }
}
</style>
