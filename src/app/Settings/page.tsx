'use client'

import Nav from '@/components/navbar'
import Claiming from '@/page/Claiming/Index'
import Dashboard from '@/page/Dashboard/Index'
import Settings from '@/page/Settings/Index'
import React from 'react'

export default function page() {
  return (
    <div className='flex'>
    <Nav/>
    <Settings/>
    </div>
  )
}