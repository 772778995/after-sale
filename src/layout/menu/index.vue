<script setup lang="ts">
import { Location } from '@element-plus/icons-vue'
</script>

<template>
  <el-menu>
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <component :is="Location"></component>
        </el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item index="1-1">
        <div class="item-boxs">
          <div class="circle"></div>
          <div class="item-name">333</div>
        </div>
      </el-menu-item>
      <el-menu-item index="1-2">item three</el-menu-item>
      <el-menu-item index="1-3">item three</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu-item {
  padding-right: 0 !important;
  padding-left: 26px !important;
  .item-boxs {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    // background: aliceblue;
    // border-right: 2px solid red;
    .circle {
      width: 6px;
      height: 6px;
      background: #606677;
      border-radius: 50%;
    }
    .item-name {
      color: #606677;
      font-weight: 400;
      font-size: 14px;
    }
  }
}
</style>
