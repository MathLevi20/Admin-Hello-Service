import React from 'react';

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center w-full  bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Acesso não autorizado</h1>
        <p className="text-gray-700 mb-4">Você não possui permissão para acessar esta página.</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Voltar</button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
