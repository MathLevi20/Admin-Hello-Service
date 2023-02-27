import { useState } from 'react'

import React from 'react'
import { API, UserId } from '../../Services/client'

export const ContractPost = ({
  descricao,
  title,
  id
}: {
  descricao: string
  title: string
  id: number
}) => {
  const [showModal, setShowModal] = useState(false)
  const [Desc, setDesc] = useState('')
  const [Title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  async function Post(title: string, descricao: string) {
    const id = UserId()
    const data = {
      name: title,
      content: descricao,
      userid: id
    }

    console.log(id)

    API.post('/userterm/create', data)
      .then(function (response: any) {
        console.log('feito')
        console.log(response.data)
        setIsLoading(true)
        window.location.reload()
      })
      .catch(function (error: any) {
        console.error(error)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <button
        className="bg-slate-800 text-[15px] hover:bg-slate-900   
                      text-white font-bold                      block
                      px-6
                      py-5
                      border border-gray-400 mb-2
                      w-full
                      rounded-md
                 
                      cursor-pointer
                      hover:bg-yellow-300 hover:text-black"
        onClick={() => setShowModal(true)}
      >
        Adicionar
      </button>
      {showModal ? (
        <>
          <div className="fixed top-0 left-0 right-0 z-50  flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
            <div className="relative w-full h-full max-w-2xl md:h-auto m-auto">
              {/*content*/}
              <div className="border-0 pt-6 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="mb-3 pt-0">
                    <input
                      type="text"
                      placeholder={'Titulo '}
                      onChange={(e) => setTitle(e.target.value)}
                      className="px-4 py-3 placeholder-slate-900 text-black relative  rounded text-lg border-2 outline-none text-left w-full"
                    />
                  </div>
                  <div className="py-2 px-4 border-2  bg-white rounded-b-lg  dark:bg-gray-800">
                    <textarea
                      style={{ minHeight: '14vh', height: 'unset' }}
                      id="editor"
                      className="block px-0 w-full text-sm outline-none
                                         text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0
                                          dark:text-white dark:placeholder-gray-400"
                      placeholder={'Descrição '}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>

                  <button
                    className="bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => Post(Title, Desc)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default ContractPost
