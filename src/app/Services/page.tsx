'use client'

import Nav from '@/components/navbar'
import Dashboard from '@/page/Dashboard/Index'
import { Services } from '@/page/Services/Index'
import React from 'react'

export default function page() {
  return (
    <div className='flex'>
    <Nav/>
    <Services/>
    </div>
  )
}
