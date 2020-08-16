export default {
  tarnslateDate(dateTime, needTime) {
    const date = new Date(dateTime)
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString()
    const day = date.getDate().toString()
    const hour = date.getHours().toString()
    const minute = date.getMinutes().toString()
    const second = date.getSeconds().toString()
    if (needTime) {
      return `${year}-${month.padStart(2, '0')}-${day.padStart(
        2,
        '0'
      )} ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(
        2,
        '0'
      )}`
    } else {
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
