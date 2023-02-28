'use client'

import Nav from '@/components/navbar'
import Services from '@/page/Service/Index'
import React from 'react'

export default function page() {
  return (
    <div className='flex'>
    <Nav/>
    <Services/>
    </div>
  )
}
