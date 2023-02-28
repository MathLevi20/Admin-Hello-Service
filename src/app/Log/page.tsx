'use client'

import Nav from '@/components/navbar'
import Dashboard from '@/page/Dashboard/Index'
import Log from '@/page/Log/Log'
import React from 'react'

export default function page() {
  return (
    <div className='flex'>
    <Nav/>
    <Log/>
    </div>
  )
}