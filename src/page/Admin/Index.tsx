import { useEffect } from 'react'
import { useState } from 'react'
import Loading from '../../components/Loading'
import { API, API_URL, TimeConverter, UserId } from '../../Services/client'
import Pagination from '../../components/pagination'
import Image from 'next/image'

interface User {
  banided: boolean
  id: string
  Nome: string
  cpf: string
  username: string
  avatar: string
  is_banided_perm: boolean
  is_banided_temp: boolean
}
TimeConverter(7)

export const Admin = () => {
  const [data, setData] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(5)

  function handlerdata() {
    return TimeConverter(7)
  }

  useEffect(() => {
    try {
      API.get('/profile/all')
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
  }, [data])

  function Ban(data: any, typeban: string) {
    API.post('/sanction/' + typeban, data)
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

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage

  function changedata(data: any) {
    if (search == '') {
      const currentPosts = data.slice(firstPostIndex, lastPostIndex)

      return currentPosts
    }

    return data
  }
  console.log(data)

  return (
    <div className="flex-1 p-6 font-bold h-screen overflow-y-auto">
      <div className={`py-2 mb-4 text-2xl font-semibold flex-1 `}>
        <h2>Administrator</h2>
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
      <div>
        <div
          className="  
                py-3   grid grid-flow-col text-center md:grid-cols-5"
        >
          <div className="border-x px-6  py-2">Id</div>
          <div className="border-x px-4 py-2 ">Nome</div>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          changedata(data)
            .filter((data: any) => {
              console.log(data.username)
              if (search == '' && data.banided == false) {
                return data
              } else if (
                data.username.toLowerCase().includes(search.toLowerCase()) &&
                data.banided == false
              ) {
                return data
              }
            })
            .map((data: any) => (
              /*if (search == data.username || data.username.toLowerCase().includes(data.username.toLowerCase()))*/ <div
                className="
                block
                px-6
                py-3
                border border-gray-400 mb-2
                w-full
                rounded-md
                text-black
                hover:bg-gray-100
              "
                key={data.id}
              >
                <div className="grid grid-cols-1 grid-flow-cols min-[850px]:grid-cols-5 gap-1">
                  <img
                    className="mx-auto rounded-full"
                    src={
                      data.avatar == 'linkaqui'
                        ? 'https://img.icons8.com/ios/512/test-account.png'
                        : data.avatar
                    }
                    width={40}
                    height={40}
                    alt="Profile Pic"
                  />
                  <div className="mx-auto">{data.username}</div>

                  <button
                    className="bg-green-500 hover:bg-green-700 text-sm text-white font-bold py-1   px-2 rounded "
                    onClick={(event) => (window.location.href = '/User/' + data.id)}
                  >
                    Ver Perfil
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-2  px-2 rounded"
                    onClick={() => Ban({ userid: UserId(), userban: data.id }, 'permanent')}
                  >
                    Permanente
                  </button>
                  <button
                    className="bg-slate-800 text-sm hover:bg-slate-900 text-white font-bold py-2 px-2 rounded"
                    onClick={() =>
                      Ban(
                        { userid: UserId(), userban: data.id, bantime: handlerdata() },
                        'temporary'
                      )
                    }
                  >
                    Temporario
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

export default Admin
