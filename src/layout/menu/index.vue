<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import useLayoutSettingStore from '@/stores/modules/setting'
const $route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const LayoutSettingStore = useLayoutSettingStore()
defineProps(['menuList'])
const handleItem = (items: any) => {
  const found = userStore.addRouteTag.find((ev: any) => ev.path == items.path)
  if (!found) {
    userStore.addRouteTag.unshift(items)
  }
}
onMounted(() => {
  userStore.indexPath = $route.matched[0].path
  userStore.addRouteTag.unshift({
    meta: $route.meta,
    name: $route.name,
    path: $route.path,
  })
})
watch(
  () => router.currentRoute.value,
  (newVal: any) => {
    userStore.indexPath = newVal.matched[0].path
  },
)
</script>
<template>
  <el-menu
    :router="true"
    :default-active="$route.path"
    :collapse="LayoutSettingStore.fold"
  >
    <template v-for="item in menuList" :key="item.path">
      <el-sub-menu
        :index="item.path"
        v-if="item.children && item.children.length > 0"
      >
        <template #title>
          <img
            :src="
              item.path !== userStore.indexPath
                ? item.meta.icon
                : item.meta.active
            "
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
