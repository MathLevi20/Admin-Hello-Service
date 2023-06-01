'use client'

import Nav from '@/components/navbar/index'
import Accounts from '@/page/Accounts/Accounts'
import React from 'react'

export default function page() {
  return (
    <div className='flex'>
    <Nav/>
    <Accounts/>
    </div>
  )
}

