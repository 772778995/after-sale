<script setup lang="ts">
import { Bottom, Hide, InfoFilled, Top, View } from '@element-plus/icons-vue'
import { headerDate } from '../orderData'
import useLayoutSettingStore from '@/stores/modules/setting'
import { computed, ref } from 'vue'
const useSettingStore = useLayoutSettingStore()
const goBackOrder = () => {
  useSettingStore.headerShow = !useSettingStore.headerShow
}
const currentPage = ref(1)
const pageSize = ref(5)
const pagedArray = computed(() => {
  return headerDate.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value,
  )
})
const handleSizeChange = (val: number) => {
  pageSize.value = val
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}
const changeIsHidden = (row: any, $index: number) => {
  console.log(row, $index, pagedArray.value)
  let page = pagedArray.value
  pagedArray.value = page.map((item) => {
    if (row.id == item.id) {
      item.isHidden = true
    }
    return item
  })
}
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
    <el-button type="primary" plain @click="goBackOrder">返回</el-button>
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
    :data="pagedArray"
  >
    <el-table-column label="排序" width="154" type="index"></el-table-column>
    <el-table-column label="字段编号" width="248" prop="id"></el-table-column>
    <el-table-column label="字段名" prop="name"></el-table-column>
    <el-table-column label="所属分类" prop="sort"></el-table-column>
    <el-table-column label="操作" width="550">
      <template #="{ row, $index }">
        <el-button type="primary" plain class="btn-move">
          <el-icon><Top /></el-icon>
          上移
        </el-button>
        <el-button type="primary" plain class="btn-move">
          <el-icon><Bottom /></el-icon>
          下移
        </el-button>
        <el-button
          type="primary"
          plain
          class="btn-move bg"
          @click="changeIsHidden(row, $index)"
        >
          <el-icon v-if="!row.isHidden"><View /></el-icon>
          <el-icon v-else><Hide /></el-icon>
          设为显示
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[5, 10, 15, 20]"
    :background="true"
    layout="->,total, sizes, prev, pager, next, jumper"
    :total="headerDate.length"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
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
.btn-move {
  border: 0;
  margin-left: 24px;
  .el-icon {
    margin-right: 7px;
  }
  &.bg {
    color: #606677;
    &:hover {
      color: #fff;
    }
  }
}
.el-pagination {
  padding: 32px;
}
</style>
