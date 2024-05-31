<script setup lang="ts">
import Header from './headerTop/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container class="layout-content">
        <el-aside>
          <el-scrollbar>
            <!-- <el-menu > -->
            <Menu />
            <!-- </el-menu> -->
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
    }
    // .el-main {
    //   background-color: rgb(255, 234, 0);
    // }
  }
}
</style>
