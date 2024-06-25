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
  relName?:string
}
