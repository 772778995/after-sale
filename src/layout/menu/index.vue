<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const $route = useRoute()

defineProps(['menuList'])
const indexPath = ref()
const handleItem = (items: any) => {
  console.log(items)
  console.log($route, '66666')
  // indexPath.value = e.indexPath[0]
  // sessionStorage.setItem('indexPath', indexPath.value)
}
onMounted(() => {
  indexPath.value = sessionStorage.getItem('indexPath')
    ? (sessionStorage.getItem('indexPath') as string)
    : '/'
})
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>
<template>
  <el-menu :router="true" :default-active="$route.path">
    <template v-for="item in menuList" :key="item.path">
      <el-sub-menu
        :index="item.path"
        v-if="item.children && item.children.length > 0"
      >
        <template #title>
          <img
            :src="item.path !== indexPath ? item.meta.icon : item.meta.active"
            class="icons"
          />
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item
          v-for="items in item.children"
          :index="items.path"
          @click="handleItem(items)"
        >
          <div class="item-boxs">
            <div class="circle"></div>
            <div class="item-name">{{ items.meta.title }}</div>
          </div>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu {
  border-right: none !important;
}
.el-sub-menu__title {
  .icons {
    width: 20px !important;
    height: 18px !important;
  }
  span {
    font-size: 16px;
    color: #1c1c28;
    padding-left: 16px;
  }
}
.el-menu-item {
  padding-right: 0 !important;
  padding-left: 26px !important;

  .item-boxs {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    .circle {
      width: 6px;
      height: 6px;
      background: #606677;
      border-radius: 50%;
      margin: 0 14px 0 26px;
    }
    .item-name {
      color: #606677;
      font-weight: 400;
      font-size: 14px;
    }
  }
  &.is-active {
    .item-boxs {
      background: #ecf5ff;
      border-right: 2px solid #409eff;
      .circle {
        background: #409eff;
      }
      .item-name {
        color: #303133;
      }
    }
  }
}
</style>
