import { useState } from 'react'
import axios from 'axios'
import { API } from '../../Services/client'

export const ModalService = ({
  descricao,
  title,
  id,
  creator,
  value
}: {
  descricao: string
  title: string
  id: string
  creator: string
  value: number
}) => {
  const [showModal, setShowModal] = useState(false)
  const [Desc, setDesc] = useState(descricao)
  const [Value, setValue] = useState(value)
  const [Title, setTitle] = useState(title)

  async function Delete(id: string) {
    API.delete('/service/delete', {
      data: {
        ServiceId: id
      }
    })
      .then(function (response: any) {
        window.location.reload()
        setShowModal(false)
      })
      .catch(function (error: any) {
        console.error(error)
      })
  }

  async function Put(
    id: string,
    name: string,
    description: string,
    value: number,
    creator: string
  ) {
    const data = {
      id: id,
      name: name,
      description: description,
      value: value,
      creator: creator
    }

    API.put('/service/update', data)
      .then(function (response: any) {
        console.log(data)

        window.location.reload()
        setShowModal(false)
      })
      .catch(function (error: any) {
        console.error(error)
      })
  }

  return (
    <>
      <button
        className="bg-slate-800 text-[12px]  hover:bg-slate-900 text-white font-bold py-2 px-5 rounded ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Ver mais
      </button>
      {showModal ? (
        <>
          <div className="fixed top-0 left-0 right-0 z-50  flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
            <div className="relative w-full h-full max-w-2xl md:h-auto m-auto">
              <div className="border-0 pt-6 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="mb-3 pt-0">
                    <input
                      type="text"
                      defaultValue={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="px-4 py-3 placeholder-slate-900 text-black relative  rounded text-lg border-2 outline-none text-left w-full"
                    />
                  </div>
                  <div className="mb-3 pt-0">
                    <input
                      type="text"
                      defaultValue={Value}
                      onChange={(e) => setValue(Number(e.target.value))}
                      className="px-4 py-3 placeholder-slate-900 text-black relative  rounded text-lg border-2 outline-none text-left w-full"
                    />
                  </div>
                  <div className="py-2 px-4 border-2  bg-white rounded-b-lg  dark:bg-gray-800">
                    <p className="mb-4 text-slate-900 text-lg text-left w-full leading-relaxed">
                      Descrição
                    </p>
                    <textarea
                      style={{ minHeight: '14vh', height: 'unset' }}
                      id="editor"
                      className="block px-0 w-full text-sm outline-none
                                         text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0
                                          dark:text-white dark:placeholder-gray-400"
                      defaultValue={descricao}
                      onChange={(e) => {
                        setDesc(e.target.value)
                        console.log(value)
                      }}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 hover:bg-red-700 hover:text-white background-transparent font-bold uppercase px-6 py-3   rounded  text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-slate-800 hover:bg-slate-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      Put(id, Title, descricao, Value, creator)
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="bg-slate-800 hover:bg-slate-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      Delete(id)
                    }}
                  >
                    Delete
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

export default ModalService
