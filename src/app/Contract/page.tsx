'use client'

import Nav from '@/components/navbar'
import Contract from '@/page/Contract/Contract'
import Dashboard from '@/page/Dashboard/Index'
import React from 'react'

export default function page() {
  return (
    <div className='flex'>
    <Nav/>
    <Contract/>
    </div>
  )
}