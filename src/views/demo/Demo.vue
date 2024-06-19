<script setup lang="ts">
import { getSDK } from '@/utils/open-im-sdk-wasm'
import { CbEvents } from '@/utils/open-im-sdk-wasm/constant'
const IMSDK = getSDK('./openIM.wasm')

IMSDK.on(CbEvents.OnConnecting, () => {
  console.warn('连接中')
})
IMSDK.on(CbEvents.OnConnectSuccess, () => {
  console.warn('连接成功')
})
IMSDK.on(CbEvents.OnConnectFailed, () => {
  console.warn('连接失败')
})
IMSDK.on(CbEvents.OnUserTokenExpired, () => {
  console.warn('token无效')
})

IMSDK.login({
  userID: 'mp_test_44',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJtcF90ZXN0XzQ0IiwiUGxhdGZvcm1JRCI6NSwiZXhwIjoxNzI2NTU1NDA3LCJuYmYiOjE3MTg3NzkxMDcsImlhdCI6MTcxODc3OTQwN30.CpZHBzJ9LIZLEkyx3_yZ_A_eziX2kIOeDnSUheztPP4',
  platformID: 5,
  apiAddr: 'https://test-mp.midiplus.com/api/v2/im/open_im',
  wsAddr: 'wss://ims.midiplus.com/msg_gateway',
})
  .then(() => {
    console.log('登录完成')
  })
  .catch(({ errCode, errMsg }) => {
    console.log('登录失败', errCode, errMsg)
  })
</script>

<template>
  <div></div>
</template>
