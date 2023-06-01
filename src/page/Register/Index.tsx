'use client'

import { ChangeEvent, useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import Image from 'next/image'
import Loading from '@/components/Loading_small'

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
      <div className="absolute inset-0 flex items-center  justify-center
      bg-gradient-to-tr from-sky-300 to-sky-500 ">        
        <div className="grid grid-rows-1 gap-1 bg-white p-10  rounded-md ">
          <Image
            src="/logo.svg"
            className={`cursor-pointer  mx-auto p-3"`}
            width={100}
            height={100}
            alt="logo"
          />
          <h4 className='text-center p-3 text-slate-800 font-semibold  font-mono text-xl '>Register</h4>

          <input
            className="p-2 border-black-900 bg-white border-cyan-600 hover:border-cyan-900 border"
            type="text"
            value={username}
            onChange={handleEmailInput}
            placeholder="Digite seu usuario"
          />
          <input
            className="p-2 border-black-900 bg-white border-cyan-600 hover:border-cyan-900 border"
            type="password"
            value={password}
            onChange={handlePasswordInput}
            placeholder="Digite sua senha"
          />
          <input
            className="p-2 border-black-900 bg-white border-cyan-600 hover:border-cyan-900 border"
            type="password"
            value={password}
            onChange={handlePasswordInput}
            placeholder="Digite novamente senha"
          />
          <button className="p-2 mt-4 rounded-md bg-slate-600 mx-12" onClick={handleSignIn}>
          {loading ? <Loading/> :<h6 className='px-2 font-semibold  font-mono text-md text-white hover:text-slate-200 '>Enviar Solicitação</h6> }
          </button>
        </div>
      </div>
    </div>
  )
}
