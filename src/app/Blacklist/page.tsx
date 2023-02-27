'use client'

import Nav from '@/components/navbar'
import Blacklist from '@/page/Blacklist'

import React from 'react'

export default function page() {
  return (
    <div className='flex'>
    <Nav/>
    <Blacklist/>
    </div>
  )
}