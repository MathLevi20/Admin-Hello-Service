'use client'

import Nav from '@/components/navbar/index'
import Dashboard from '@/page/Dashboard/Index'
import UnauthorizedPage from '@/page/error/notauth'
import React from 'react'

export default function page() {
  return (
    <div className='relative flex flex-grow'>
 <Nav/>
   <UnauthorizedPage/>
    </div>
  )
}
