import { MessageItem } from '@/utils/open-im-sdk-wasm/types/entity'
export interface ExType {
  checked?: boolean
  errCode?: number
}

export type ExMessageItem = MessageItem & ExType

export interface IAdvancedMessageResponse {
  lastMinSeq: number
  isEnd: boolean
  messageList: ExMessageItem[]
}
