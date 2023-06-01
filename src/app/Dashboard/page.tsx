'use client'

import Nav from '@/components/navbar/index'
import Dashboard from '@/page/Dashboard/Index'
import React from 'react'

export default function page() {
  return (
    <div className='flex'>
            <link rel="shortcut icon" href="/vercel.ico" />
    <Nav/>
    <Dashboard/>
    </div>
  )
}
