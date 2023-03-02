'use client'

import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth_context'
import Image from 'next/image'

export const Register = () => {
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
          <Image
            src="/logo.svg"
            className={`cursor-pointer pb-7 mx-auto p-3"`}
            width={100}
            height={100}
            alt="logo"
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
            {loading ? '...' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  )
}
