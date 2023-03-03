'use client'

import { AuthContextProvider } from '@/contexts/authContext'
import { Register } from '@/page/Register/Index'
import React from 'react'

export default function page() {
  return (
    <div>
        <AuthContextProvider>
          <Register/>
          </AuthContextProvider>
          </div>
  )
}
