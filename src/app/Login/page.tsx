'use client'

import { Login } from '@/page/Login'
import React from 'react'
import { AuthContextProvider } from '../../contexts/authContext'

export default function page() {
  return (
    <div className='flex'>
    <AuthContextProvider>
      <Login/>
    </AuthContextProvider>

    </div>
  )
}
