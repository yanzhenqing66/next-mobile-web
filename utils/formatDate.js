
const monthList = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec")

// 'Nov 22, 2022'
export function formatOrderDate(date) {
  if (!date) return
  const {
    year,
    month,
    day,
  } = formatNewDate(date * 1)
  return monthList[month] + ' ' + formatStr(day) + ', ' + year
}

// ''
export function formatEnglishDate(date) {
  if (!date) return
  let newDate = new Date(date)
    .toDateString().split(' ')
  return newDate[1] + ' ' + newDate[2] + ' ' + newDate[3]
}

// '08/23/2022'
export function formatReviewDate(date) {
  if (!date) return
  const {
    year,
    month,
    day
  } = formatNewDate(date * 1)
  return formatStr(month + 1) + '/' + formatStr(day) + '/' + year
}

// 2022-03-12
export function formatBirth(date) {
  if (!date) return
  const {
    year,
    month,
    day
  } = formatNewDate(date * 1)
  return year + '-' + formatStr(month + 1) + '-' + formatStr(day)
}

// 2022
export function formatYear(date) {
  if (!date) return
  const { year } = formatNewDate(date)
  return year
}

// 11/26/2022 08:05am
export function formatTrackDate(date) {
  if (!date) return
  const {
    year,
    month,
    day,
    hour,
    minute,
    ma
  } = formatNewDate(date)
  return formatStr(month + 1) + '/' + formatStr(day) + '/' + year + ' ' + formatStr(hour) + ':' + formatStr(minute) + ma
}

export function formatNewDate(date) {
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth()
  const day = newDate.getDate()
  const hour = newDate.getHours()
  const minute = newDate.getMinutes()
  const second = newDate.getSeconds()
  let ma = 'am'
  if (hour < 12) {
    ma = 'am'
  } else {
    ma = 'pm'
  }
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    ma
  }
}

export function formatStr(str) {
  if (!str) return
  if (str.length < 2) {
    return '0' + str
  }
  return str
}