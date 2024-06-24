import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // 导入 relativeTime 插件
import calendar from 'dayjs/plugin/calendar' // 导入插件
import useChartStore from '@/stores/modules/chart'

dayjs.extend(relativeTime)
dayjs.extend(calendar)

export const formatConversionTime = (timestemp: number): string => {
  if (!timestemp) return ''
  const fromNowStr = dayjs(timestemp).format('YYYY-MM-DD HH:mm')
  return fromNowStr
}
//转换表情
export const transformFace = (text: any) => {
  const useChart = useChartStore()
  let emojiList = useChart.emojis
  let newText = text.replace(/\[([^\[\]]*)\]/g, function (face: any) {
    //转义表情
    let faceText = face.replace(/\[|\]/g, '')
    let emoji = emojiList.filter((item: any) => {
      return faceText == item.name
    })
    if (emoji.length > 0) {
      return emoji[0]['glyph']
    } else {
      return face
    }
  })
  return newText
}
