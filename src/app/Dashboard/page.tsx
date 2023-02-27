'use client'

import Nav from '@/components/navbar'
import Dashboard from '@/page/Dashboard/Index'
import React from 'react'

export default function page() {
  return (
    <div className='flex'>
    <Nav/>
    <Dashboard/>
    </div>
  )
}
