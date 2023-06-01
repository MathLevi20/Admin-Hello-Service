'use client'


import Nav from '@/components/navbar/index'
import { AuthContextProvider } from '@/contexts/authContext'
import Admin from '@/page/Admin/Index'
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