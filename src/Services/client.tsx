import axios from 'axios';

export const API_URL = 'https://nightmarelight-re2.onrender.com';
export const base_url = 'https://nightmarelight-re2.onrender.com';


interface AcessToken {
  acessToken: string;
}

let acesstoken: AcessToken | null = null;
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

export const User1: AcessToken | null = getUserId();


console.log('User1:', User1);



  export const API = axios.create({
    baseURL: base_url,
    headers: {
      'Authorization': User1 ? `Bearer ${User1.acessToken}` : '',
    },
  });

export const formatDate = (dateString:any) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const checkAuthorization = async () => {
  try {

    const postInstance = await createPostInstance();
    const response = await postInstance.post('');
    console.log(response);

    if (Number(response.status) === 200) {
      console.log('Recurso encontrado');
      return true;
    } else {
      console.log('Recurso não encontrado');
      return false;
    }
  } catch (error) {
    console.log('Erro ao verificar autorização:', error);
    return false;
  }
};


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

export const getUserRoles = () => {
  const acesstoken = JSON.parse(localStorage.getItem('@user') || 'false')
  console.log('aaaaaaaa')
  console.log(acesstoken)
  const UserId = String(acesstoken.user.type)

  console.log(UserId)

  return [UserId]
}
;
export const get = async () => {
  try {
    const accessToken = await JSON.parse(localStorage.getItem('@user') || 'false');
    console.log('aaaaaaaa');
    console.log(accessToken);
    const userId = String(accessToken.acessToken);
    console.log(userId);

    return userId;
  } catch (error) {
    console.log('Erro ao obter o ID do usuário:', error);
    return null;
  }
};


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
export const createPostInstance = async () => {
  const token = await get(); // Obtenha o token de acesso

  return axios.create({
    baseURL: base_url,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};