import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import { API } from '../../Services/client'
import Pagination from '../../components/pagination'
import Image from 'next/image'

export const Blacklist = () => {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(20)

  useEffect(() => {
    try {
      API.get('/profile/all')
        .then(function (response: any) {
          setData(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => setIsLoading(false))
    } catch (error: any) {
      console.log('Error')
    }
  }, [])

  const handleUnban = (data: any) => {
    API.patch('/sanction/revogue', data)
      .then(function (response: any) {
        setData(response.data)
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
    if (search === '') {
      return data.slice(firstPostIndex, lastPostIndex).filter((item: any) => item.banided === true)
    }

    return data.filter(
      (item: any) =>
        item.username.toLowerCase().includes(search.toLowerCase()) && item.banided === true
    )
  }

  return (
    <div className="flex-1 p-6 font-bold h-screen overflow-y-auto">
      <div className={`py-2 mb-4 text-2xl font-semibold flex-1`}>
        <h2>Blacklist</h2>
        <div className="mt-3 w-full flex justify-center pt-0">
          <input
            type="text"
            placeholder="Procurar"
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            className="px-4 py-3 flex justify-center w-3/4 placeholder-slate-900 text-black relative rounded text-lg border-2 outline-none text-left"
          />
        </div>
      </div>
      <div className="py-3 grid grid-cols-4">
        <div className="border-x px-6 py-2">Id</div>
        <div className="border-x px-4 py-2">Nome</div>
        <div className="border-x-l px-2 py-2">Data</div>
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          changedata(data).map((item: any) => (
            <div
              className="block px-6 py-3 border border-gray-400 mb-2 w-full rounded-md text-black cursor-pointer hover:bg-gray-100"
              key={item.id}
            >
              <div className="grid grid-cols-4 gap-2 ease-in transition-opacity-80">
                <Image
                  className="mx-auto rounded-full"
                  src={
                    item.avatar === 'linkaqui'
                      ? 'https://img.icons8.com/ios/512/test-account.png'
                      : item.avatar
                  }
                  width={50}
                  height={50}
                  alt="Avatar"
                />
                <div className="mx-auto">{item.username}</div>
                <button
                  className="bg-green-500 hover:bg-green-700 text-sm text-white font-bold py-1 px-2 rounded"
                  onClick={(event) => (window.location.href = '/User/' + item.id)}
                >
                  Ver Perfil
                </button>
                <button
                  className="bg-yellow-400 text-[12px] hover:bg-yellow-500 text-white font-bold py-2 px-2 rounded"
                  onClick={() => handleUnban({ userban: item.id })}
                >
                  Desbanir
                </button>
              </div>
            </div>
          ))
        )}
        {changedata(data).length === 0 && !isLoading && (
          <div className="text-center py-4">Nenhum usuário banido encontrado.</div>
        )}
      </div>
      <div className="flex justify-center text-sm w-full">
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
