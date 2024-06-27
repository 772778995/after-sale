import { MD5 } from 'crypto-js'
export const getFileMD5 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(MD5(e.target?.result).toString())
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file.slice(0, 1024 * 1024)) // 仅读取文件的一部分，避免大文件影响性能
  })
}