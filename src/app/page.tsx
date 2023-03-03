
'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { Login } from '@/page/Login'
import { AuthContextProvider } from '@/contexts/authContext'



export default function Home() {
  return (
    <AuthContextProvider>
    <Login/>
    </AuthContextProvider>

  )
}
