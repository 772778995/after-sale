<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue'
import { headerDate } from '../orderData'
</script>

<template>
  <div class="boxs-tip">
    <div class="tip">
      <el-icon color="#409EFF" class="icon-info"><InfoFilled /></el-icon>
      <span>
        你可以放心设置成自己方便的表头字段排序，该设置仅针对你自己的界面显示，不会影响其他人。
      </span>
    </div>
  </div>
  <div class="btn">
    <el-button type="primary" plain>返回</el-button>
    <el-button type="primary">恢复默认</el-button>
  </div>
  <el-table
    border
    :cell-style="{ 'text-align': 'center', height: '55px' }"
    :header-cell-style="{
      'text-align': 'center',
      background: ' #F5F7FA',
      color: ' #303133',
    }"
    :data="headerDate"
  >
    <el-table-column label="排序" width="154" type="index"></el-table-column>
    <el-table-column label="字段编号" width="248" prop="id"></el-table-column>
    <el-table-column label="字段名" prop="name"></el-table-column>
    <el-table-column label="所属分类" prop="sort"></el-table-column>
    <el-table-column label="操作" width="550">
      <!-- <template #="{row}">

        </template> -->
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">
.boxs-tip {
  width: 100%;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  .tip {
    width: 1540px;
    height: 30px;
    background: #ecf5ff;
    border-radius: 4px;
    display: flex;
    align-items: center;
    .icon-info {
      margin: 6px 17px 6px 11px;
    }
    span {
      font-weight: 400;
      font-size: 14px;
      color: #409eff;
    }
  }
}
.btn {
  padding: 0 17px 24px 16px;
  display: flex;
  justify-content: space-between;
}
</style>
