import React from 'react'
import Contract_list from '.'
import Nav from '../../components/Nav'

const Contract = () => {
  return (
    <div className="flex-1 p-6 font-bold h-screen overflow-y-auto">
      <div className={`py-2 mb-4 text-2xl font-semibold flex-1 `}>
        <h2>Contratos</h2>
        <div className="mt-3 pt-0">
          <Contract_list />
        </div>
      </div>
    </div>
  )
}

export default Contract
