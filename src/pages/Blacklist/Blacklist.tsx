import { useEffect, useState } from 'react'
import useFetch from 'react-fetch-hook'
import Loading from '../../components/Loading'
import Nav from '../../components/Nav'
import { API } from '../../Services/client'
import Pagination from '../../components/pagination'

interface User_Ban {
  avatar: any
  cpf: number
  banided: boolean
  username: any
  is_banided_perm: boolean
  is_banided_temp: boolean
  id: number
  Nome: string
  date: string
  Status: string
}

export const Blacklist = () => {
  const [data, setData] = useState<User_Ban[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(20)

  console.log(data)
  console.log(isLoading)
  useEffect(() => {
    try {
      // eslint-disable-next-line prettier/prettier
      API.get('/profile/all')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(function (response: any) {
          setData(response.data)
          console.log(data)
          console.log('feito')
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => setIsLoading(false))
    } catch (error: any) {
      console.log('Error')
    } // complete loading success/fail
  }, [])

  const updateNote = async (id: any, data: any, is_banided_perm: any, is_banided_temp: any) => {
    await fetch(`http://localhost:3000/Usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...data, is_banided_perm, is_banided_temp })
    })
  }
  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage

  function UnBan(data: any) {
    API.patch('/sanction/revogue', data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(function (response: any) {
        setData(response.data)
        console.log(data)
        console.log('feito')
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setIsLoading(false))
  }

  function changedata(data: any) {
    if (search == '') {
      const currentPosts = data.slice(firstPostIndex, lastPostIndex)

      return currentPosts
    }

    return data
  }
  console.log(data)

  console.log(data)
  console.log(typeof data)

  return (
    <div className="flex-1 p-6  font-bold h-screen overflow-y-auto">
      <div className={`py-2 mb-4 text-2xl font-semibold flex-1 `}>
        <h2>Blacklist</h2>
        <div className="mt-3 w-full flex justify-center pt-0">
          <input
            type="text"
            placeholder={'Procurar'}
            onChange={(e) => {
              setSearch(e.target.value), changedata(data)
            }}
            className="px-4 py-3 flex justify-center w-3/4 placeholder-slate-900 text-black relative  rounded text-lg border-2 outline-none text-left "
          />
        </div>
      </div>
      <div
        className="  
                py-3    grid grid-cols-7"
      >
        <div className="border-x px-6  py-2">Id</div>
        <div className="border-x px-4 py-2 ">Nome</div>
        <div className="border-x-l px-2 py-2 ">Data</div>
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          changedata(data)
            .filter((data: any) => {
              console.log(data.username)
              if (search == '' && data.banided == true) {
                return data
              } else if (
                data.username.toLowerCase().includes(search.toLowerCase()) &&
                data.banided == true
              ) {
                return data
              }
            })
            .map((data: any) => (
              <div
                className="
                 
                      block
                      px-6
                      py-3
                      border border-gray-400 mb-2
                      w-full
                      rounded-md
                      text-black
                      cursor-pointer
                      hover:bg-gray-100
                    "
                key={data.id}
              >
                <div className="grid grid-cols-7 gap-2 ease-in transition-opacity-80 ">
                  <img
                    className="mx-auto rounded-full"
                    src={
                      data.avatar == 'linkaqui'
                        ? 'https://img.icons8.com/ios/512/test-account.png'
                        : data.avatar
                    }
                    width="40"
                  />
                  <div className="mx-auto">{data.username}</div>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-sm text-white font-bold py-1   px-2 rounded "
                    onClick={(event) => (window.location.href = '/User/' + data.id)}
                  >
                    Ver Perfil
                  </button>

                  <button
                    className="bg-yellow-400 text-[12px] hover:bg-yellow-500 text-white font-bold py-2 px-2 rounded"
                    onClick={() => UnBan({ userban: data.id })}
                  >
                    Desbanir
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
      <div className=" flex justify-center text-sm w-full">
        <Pagination
          totalPosts={data.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default Blacklist
