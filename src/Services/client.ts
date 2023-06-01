'use client'
import { useAuth } from '@/contexts/authContext'
import axios from 'axios'
// eslint-disable-next-line react-hooks/rules-of-hooks

export const API_URL = 'https://nightmarelight-re.onrender.com'
export const base_url = 'https://nightmarelight-re.onrender.com'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1ZDI4ZTY0LTMwZDItNGNmMC1iNjQ5LTZhOGM1NTRhYzljMCIsInVzZXJuYW1lIjoibGV2aTAiLCJ0eXBlIjoiYWRtaW4iLCJ0b2tlbiI6ImFjZXRva2VuIiwiaWF0IjoxNjg1NTgzMDYxLCJleHAiOjE2ODU2MjYyNjF9.2UhAgajXw7Hqg-VqgeYsv8BpnjQpi_AtFt02zSOz0l8'

// eslint-disable-next-line react-hooks/rules-of-hooks

export function UserId() {
  const acesstoken = JSON.parse(localStorage.getItem('@user') || 'false')
  const UserId = String(acesstoken.user.id)

  console.log(UserId)

  return UserId
}

const acesstoken = JSON.parse(localStorage.getItem('@user') || '{}');
export const User1 = acesstoken.acessToken  ;

console.log(acesstoken);
console.log(User1);

export const API = axios.create({
  baseURL: base_url,
  headers: {
    'Authorization': 'Bearer ' + String(User1)
  }
});

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

export const getLocalStorage = (key:string) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item 
  }
  return null;
};