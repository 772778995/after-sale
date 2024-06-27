export interface loginFormData {
  login: string
  verifiable_code?: string
  password?: string
  verifiable_type?: string
}
export interface loginCodesData {
  phone: string
}
export interface registerData {
  name?: string
  phone: string
  password?: string
  verifiable_code: string
  verifiable_type?: string
  relName?: string
}
type storageObj = {
  channel: string
}
export interface fileData {
  filename: string
  hash: string
  size: string
  mime_type: string
  storage: storageObj
}
