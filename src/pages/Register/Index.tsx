import { ChangeEvent, useContext, useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import axios, { AxiosError } from 'axios'
import { useAuth } from '../../contexts/auth_context'

export const Register = () => {
  const navigate = useNavigate()
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

  return (
    <div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-rows-1 bg-slate-500 p-10  rounded-md ">
          <img
            src="https://ojkprgyzivdeqwjymnvn.supabase.co/storage/v1/object/sign/admin/Components/logo.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZG1pbi9Db21wb25lbnRzL2xvZ28uc3ZnIiwidHJhbnNmb3JtYXRpb25zIjoiIiwiaWF0IjoxNjcwNTA2ODIwLCJleHAiOjE5ODU4NjY4MjB9.eK6Q4dwfLv-BVCrdpt4uaMDz5XG--wXbck0thnEGSDg"
            className={`cursor-pointer pb-7 mx-auto p-3"`}
            width="100"
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
