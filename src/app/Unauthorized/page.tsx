'use client'

import Nav from '@/components/navbar/index';
import React from 'react';
import { useRouter } from 'next/navigation';


const UnauthorizedPage = () => {
    const router = useRouter();
  const handleRedirect = () => {
    router.push('/Settings'); // Substitua "/caminho-da-rota" pelo caminho desejado
  };
  return (
    <div className='flex'><Nav /><div className="flex items-center justify-center w-full  bg-gray-100">
          <div className="bg-white p-8 rounded shadow-lg">
              <h1 className="text-4xl font-bold mb-4">Acesso não autorizado</h1>
              <p className="text-gray-700 mb-4">Você não possui permissão para acessar esta página.</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={handleRedirect}>Voltar</button>
          </div>
      </div></div>
  );
};

export default UnauthorizedPage;
