import { useId, useState } from 'react'
import axios from 'axios'
import { API } from '../../Services/client'

export const ModalServicePost = () => {
  const [showModal, setShowModal] = useState(false)
  const [description, setDescription] = useState(String)
  const [value, setValue] = useState(Number)
  const [name, setName] = useState(String)

  const client = axios.create({ baseURL: 'https://nightmarelight.onrender.com' })

  async function addService(name: string, value: number, description: string) {
    const acesstoken = JSON.parse(localStorage.getItem('@user') || 'false')
    const acesstoke1 = acesstoken.user.id
    const data = { name: name, userid: acesstoke1, value: value, description: description }

    console.log(typeof acesstoken)
    API.post('/service/create', data)
      .then(function (response: any) {
        setShowModal(false)
        window.location.reload()
      })
      .catch(function (error: any) {
        console.error(error)
      })
  }

  return (
    <>
      <button
        className="bg-slate-800 text-[15px] text-white font-bold  block px-6 py-5 border border-gray-400 mb-2 w-full rounded-md cursor-pointer hover:bg-yellow-300 hover:text-black"
        onClick={() => setShowModal(true)}
      >
        <div className="py-5"> Adicionar</div>
      </button>
      {showModal ? (
        <>
          <div className="fixed top-0 left-0 right-0 z-50  flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
            <div className="relative w-full h-full max-w-2xl md:h-auto m-auto">
              {/*content*/}
              <div className="border-0 pt-6 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <div className="mb-3 pt-0">
                    <input
                      type="text"
                      placeholder={'Cargo'}
                      onChange={(e) => setName(e.target.value)}
                      className="px-4 py-3 text-base placeholder-gray-400 text-black relative  rounded  border-2 outline-none text-left w-full"
                    />
                  </div>
                  <div className="mb-3 pt-0">
                    <input
                      type="text"
                      placeholder={'Valor'}
                      onChange={(e) => setValue(Number(e.target.value))}
                      className="px-4 py-3 text-base placeholder-gray-400 text-black relative  rounded border-2 outline-none text-left w-full"
                    />
                  </div>
                  <div className="py-2 px-4 border-2  bg-white rounded-b-lg  dark:bg-gray-800">
                    <textarea
                      style={{ minHeight: '14vh', height: 'unset' }}
                      id="editor"
                      className="block  px-0 w-full text-sm outline-none
                                         text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 
                                          dark:text-white dark:placeholder-gray-400"
                      placeholder={'Descrição do Cargo'}
                      onChange={(e) => setDescription(e.target.value)}
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
                    className="bg-green-500 text-white hover:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => addService(name, value, description)}
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

export default ModalServicePost
