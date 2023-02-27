﻿'use client'

import Nav from '@/components/navbar'
import Accounts from '@/page/Accounts/Accounts'
import Dashboard from '@/page/Dashboard/Index'
import React from 'react'

export default function page() {
  return (
    <div className='flex'>
    <Nav/>
    <Accounts/>
    </div>
  )
}

