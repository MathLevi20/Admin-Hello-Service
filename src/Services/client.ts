import User from '../pages/User/Index'

export const API_URL = 'https://nightmarelight.onrender.com'


export function UserId() {
  const acesstoken = JSON.parse(localStorage.getItem('@user') || 'false')
  const UserId = String(acesstoken.user.id)

  console.log(UserId)

  return UserId
}

export function TimeConverter(days: number) {
  const timestamp = Date.now()
  const time = new Date(timestamp)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const date = time.getDate() + 1
  const timeformat = `${year}-${month}-${date}`

  console.log(year)
  console.log(month)
  console.log(date)

  return timeformat
}

export const timestamp = Date.now()
