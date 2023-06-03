'use client'
import { useAuth } from '@/contexts/authContext'
import axios from 'axios'
// eslint-disable-next-line react-hooks/rules-of-hooks

export const API_URL = 'https://nightmarelight-re2.onrender.com'
export const base_url = 'https://nightmarelight-re2.onrender.com'

// eslint-disable-next-line react-hooks/rules-of-hooks

export function UserId() {
  const acesstoken = JSON.parse(localStorage.getItem('@user') || 'false')
  const UserId = String(acesstoken.user.id)

  console.log(UserId)

  return UserId
}
interface AccessToken {
  accessToken: string;
  // Outras propriedades do objeto, se houver
}

let acesstoken: AccessToken = { accessToken: '' };

if (typeof window !== 'undefined') {
    const storedToken = localStorage.getItem('@user');

  acesstoken = storedToken ? JSON.parse(storedToken) : { accessToken: '' };
}

export const User1 = acesstoken.accessToken || '';

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