'use client'

import Nav from '@/components/navbar'
import { AuthContextProvider } from '@/contexts/auth_context'
import Admin from '@/page/Admin/Index'
import Dashboard from '@/page/Dashboard/Index'
import React from 'react'

export default function page() {
  return (
    <div className='flex'>
    <AuthContextProvider>
    <Nav/>
    <Admin/>
    </AuthContextProvider>
    </div>
  )
}