'use client'

import Nav from '@/components/navbar'
import Dashboard from '@/page/Dashboard/Index'
import { Login } from '@/page/Login'
import React from 'react'
import { AuthContextProvider, useAuth } from '../../contexts/auth_context'

export default function page() {
  return (
    <div className='flex'>
      <AuthContextProvider>

    <Login/>
    </AuthContextProvider>

    </div>
  )
}
