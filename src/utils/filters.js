// 日期格式化过滤器 - 2017年5月10日15：35
export function toDate(date) {
  if (date) {
    const d = new Date(date)
    const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' +
      d.getDate() + '日 ' + hours + ' : ' + minutes
  }
}

// 日期格式化过滤器 - 2017-5-10 at 15：35
export function to_date(date) {
  if (date) {
    const d = new Date(date)
    const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' +
      d.getDate() + ' ' + hours + ': ' + minutes
  }
}

// 标签数组转字符串过滤器
export function toTag(arr) {
  if (arr) {
    return arr.join('，')
  }
}

// 导出所有过滤器
export default {
  toDate,
  to_date,
  toTag
}
