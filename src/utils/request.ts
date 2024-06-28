import useUserStore from '@/stores/modules/user'
import axios from 'axios'
// import { ElMessage } from 'element-plus'

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
request.interceptors.request.use((config) => {
  const useStore = useUserStore()
  if (useStore.token) {
    config.headers.Authorization = useStore.token
  } else {
    config.headers.Accept = 'application/json'
    config.headers.version = '4.3.0'
    config.headers.systemType = 'wx'
  }
  return config
})

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log(error)
    // ElMessage({
    //   type: 'error',
    //   message: error.response.data.message,
    // })
    return Promise.reject(error.response.data)
  },
)
export default request
