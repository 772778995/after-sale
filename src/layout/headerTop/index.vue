<script setup lang="ts"></script>

<template>
  <div class="header-container">
    <div class="header">
      <el-row>
        <el-col :span="8" :xs="24">
          <div class="header-left">
            <img src="@/assets/images/logo.png" class="logo-img" />
            <div class="logo-title">
              <p class="title-cn">售后系统</p>
              <p class="title-en">After -sales system</p>
            </div>
          </div>
        </el-col>
        <el-col :span="16" :xs="0">
          <div class="header-right">
            <div class="user-info">
              <img
                src="@/assets/images/default_unknow@2x.png"
                class="user-avater"
              />
              <span class="user-name">admin</span>
            </div>
            <div class="logout-box">
              <el-tooltip
                class="box-item"
                effect="light"
                content="退出登录"
                placement="bottom"
              >
                <img src="@/assets/images/logout-btns.png" class="logout-img" />
              </el-tooltip>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .header {
    width: 100%;
    height: 76px;
    background-color: #fff;
    .el-row {
      height: 100%;
    }
    .header-left {
      height: 100%;
      display: flex;
      align-items: center;
      .logo-img {
        width: 47px;
        height: 47px;
        margin: 0 21px 0 24px;
      }
      .logo-title {
        font-weight: 400;
        .title-cn {
          font-size: 24px;
          color: #1c1c28;
          height: 36px;
          line-height: 36px;
        }
        .title-en {
          font-family: Verdana, Verdana;
          font-size: 12px;
          color: #465b65;
        }
      }
    }
    .header-right {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .user-info {
        display: flex;
        align-items: center;
        .user-avater {
          width: 30px;
          height: 30px;
        }
        .user-name {
          font-weight: 400;
          font-size: 16px;
          color: #000000;
          padding: 0 12px;
        }
      }
      .logout-box {
        padding: 0 35px;
        .logout-img {
          width: 16px;
          height: 16.4px;
        }
      }
    }
  }
}
</style>
