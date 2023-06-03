'use client'

import Nav from '@/components/navbar'
import Claiming from '@/page/Claiming/Index'
import React from 'react'

export default function page() {
  return (
    <div className='flex  overflow-y-visible '>
    <Nav/>
    <Claiming/>
    </div>
  )
}