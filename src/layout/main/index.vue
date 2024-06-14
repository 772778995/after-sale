<script setup lang="ts">
import { Close } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import useLayoutSettingStore from '@/stores/modules/setting'

const $route = useRoute()
const $router = useRouter()
const userStore = useUserStore()
const LayoutSettingStore = useLayoutSettingStore()
const handleChangeTag = (items: any) => {
  $router.push({ path: items.path })
}
const handleCloseTag = (tag: any) => {
  if (userStore.addRouteTag.length == 1) {
    userStore.addRouteTag.splice(0, 1)
    $router.push({ path: '/' })
    let timer = setTimeout(() => {
      clearTimeout(timer)
      userStore.addRouteTag.unshift({
        meta: $route.meta,
        name: $route.name,
        path: $route.path,
      })
    }, 500)
    return
  } else if ($route.path == tag.path) {
    let index = userStore.addRouteTag.findIndex(
      (ev: any) => ev.path === tag.path,
    )
    if (index !== -1) {
      userStore.addRouteTag.splice(index, 1)
      $router.push({
        path:
          index == 0
            ? userStore.addRouteTag[0].path
            : userStore.addRouteTag[index - 1].path,
      })
    }
    return
  }
  let index = userStore.addRouteTag.findIndex((ev: any) => ev.path === tag.path)
  userStore.addRouteTag.splice(index, 1)
}
const changeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold
}
</script>

<template>
  <div class="breadcrumb">
    <img
      src="@/assets/images/icon-expand-btns.png"
      v-if="LayoutSettingStore.fold"
      @click="changeIcon"
    />
    <img src="@/assets/images/icon-fold-btns.png" v-else @click="changeIcon" />
    <div class="breadcrumb-box" ref="scrollContainer">
      <div
        class="breadcrumb-item"
        v-for="(item, index) in userStore.addRouteTag"
        :key="index"
        :class="item.path == $route.path ? 'active' : ''"
        @click="handleChangeTag(item)"
      >
        <p class="title" :class="item.path == $route.path ? 'active' : ''">
          {{ item.meta.title }}
        </p>
        <el-icon
          :color="item.path == $route.path ? '#606677' : ''"
          @click.stop="handleCloseTag(item)"
        >
          <Close />
        </el-icon>
      </div>
    </div>
  </div>
  <div class="mainContent">
    <el-scrollbar>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb {
  width: 100%;
  height: 64px;
  display: flex;
  align-items: end;
  img {
    width: 22px;
    height: 20px;
    margin: 0 16px 9px 16px;
  }
  .breadcrumb-box {
    flex: 0.95;
    display: flex;
    align-items: center;
    overflow-y: hidden;
    flex-wrap: nowrap;
    .breadcrumb-item {
      min-width: 176px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: end;
      white-space: nowrap;
      padding-right: 27px;

      &.active {
        background: url('@/assets/images/icon-breadcrumb-bg.png') no-repeat;
        background-size: cover;
      }

      .title {
        text-align: center;
        font-size: 16px;
        color: #303133;
        flex: 0.9;

        &.active {
          color: #606677;
        }
      }
    }
  }
}
.mainContent {
  height: calc(100% - 64px - 24px);
  background-color: #f5f5f5;
  padding: 16px 21px 16px 11px;
  margin: 0 24px 24px 0;
  border-radius: 0 10px 10px;
}
.el-scrollbar {
  height: 100% !important;
  background-color: #fff !important;
}
/* 隐藏滚动条的样式 */
::-webkit-scrollbar {
  display: none;
}
</style>
