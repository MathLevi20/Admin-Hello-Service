import { ChangeEvent, useContext, useState } from 'react'
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../contexts/Auth/AuthContext'
import axios, { AxiosError } from 'axios'
import { useAuth } from '../../contexts/auth_context'
import Image from 'next/image';
export const Login = () => {
  const navigate = useRouter()
  const { signIn } = useAuth()
  const [loading, setLoading] = useState(false)

  const [username, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const client = axios.create({
    baseURL: ' https://nightmarelight.onrender.com'
  })
  const handleSignIn = async () => {
    setLoading(true)
    try {
      await signIn({ email: username, password })
      console.log('finalizado')
    } catch (err) {
      console.log(err)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    if (username && password) {
      const isLogged = await client
        .post('/auth/signin', {
          username: username,
          password: password
        })
        .then(function (response: any) {
          console.log(response)
          localStorage.setItem('acetoken', response.data.acetoken)
          localStorage.setItem('reftoken', response.data.reftoken)
          localStorage.setItem('id', response.data.id)
          console.log('asv')
          if (response.data.signin === true) {
            return navigate.push('/Services')
          } else alert('senha errada')

          return navigate.push('/Login')
        })
        .catch(function (error: any) {
          console.error(error)
        })
    }
  }

  return (
    <div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-rows-1 bg-slate-500 p-10  rounded-md ">
          <Image
            src=""
            className={`cursor-pointer pb-7 mx-auto p-3"`}
            width="100"
            alt="icon"
          
          />
          <input
            className="p-2 border-black-900 border"
            type="text"
            value={username}
            onChange={handleEmailInput}
            placeholder="Digite seu e-mail"
          />
          <input
            className="p-2 mt-2 border-black-900 border"
            type="password"
            value={password}
            onChange={handlePasswordInput}
            placeholder="Digite sua senha"
          />
          <button className="mt-2 p-2 rounded-md bg-slate-600" onClick={handleSignIn}>
            {loading ? '...' : 'Logar'}
          </button>
        </div>
      </div>
    </div>
  )
}
