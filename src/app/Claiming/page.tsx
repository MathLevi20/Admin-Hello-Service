'use client'

import Nav from '@/components/navbar'
import withAuth from '@/contexts/Acesscontrol';
import Claiming from '@/page/Claiming/Index'
import React from 'react'

const ProtectedClamming = withAuth(Claiming, ["admin", "moderator"]); // Envolve o componente Dashboard com o HOC withAuth

export default function page() {
  return (
    <div className="flex  overflow-y-visible ">
      <Nav />
      <ProtectedClamming />
    </div>
  );
}