import axios from 'axios';

export const API_URL = 'https://nightmarelight-re2.onrender.com';
export const base_url = 'https://nightmarelight-re2.onrender.com';


interface AccessToken {
  accessToken: string;
}

let acesstoken: AccessToken | null = null;
function getUserId(): any {
try {
  if (typeof window !== 'undefined') {
    console.log('You are on the browser');

    const storedToken = localStorage.getItem('@user');
    console.log(storedToken);

    if (storedToken) {
      return acesstoken = JSON.parse(storedToken);
    }
  }
} catch (error) {
  console.error('An error occurred while accessing localStorage:', error);
}
}

export const User1:any = getUserId();

console.log('User1:', User1);

export const API = axios.create({
  baseURL: base_url,
  headers: {
    'Authorization': `Bearer ${User1.acessToken}`,
  },
});

export function TimeConverter(days: number): string {
  const timestamp = Date.now();
  const time = new Date(timestamp);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate() + 1;
  const timeformat = `${year}-${month}-${date}`;

  console.log(year);
  console.log(month);
  console.log(date);

  return timeformat;
}

export const timestamp = Date.now();



// Exemplo de uso em um componente

export function UserId() {
  const acesstoken = JSON.parse(localStorage.getItem('@user') || 'false')
  const UserId = String(acesstoken.user.id)

  console.log(UserId)

  return UserId
}
export const getLocalStorage = (key:string) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item 
  }
  return null;
};