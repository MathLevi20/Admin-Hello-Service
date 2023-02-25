import { ReactNode, useEffect, useState } from 'react'
import useFetch from 'react-fetch-hook'
import Loading from '../../components/Loading'
import Nav from '../../components/Nav'
import { API, TimeConverter, UserId } from '../../Services/client'
import Pagination from '../../components/pagination'

interface User_Ban {
  denounced_id: any
  solved: any
  solve: ReactNode
  reason: ReactNode
  denounced: ReactNode
  action: ReactNode
  time: ReactNode
  id: number
  Nome: string
  msg: string
  by: string
}

export const Claiming = () => {
  const [data, setData] = useState<User_Ban[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)

  function handlerdata() {
    return TimeConverter(7)
  }

  useEffect(() => {
    try {
      // eslint-disable-next-line prettier/prettier, no-inner-declarations
   
      API.get('/denounce/')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(function (response: any) {
          setIsLoading(true)
          setData(response.data)
          console.log(data)
          console.log('feito')
        })
        .catch((error: any) => {
          console.log(error)
        })
        .finally(() => setIsLoading(false))
    } catch (error: any) {
      console.log('Error')
    } // complete loading success/fail
  }, [])
  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = Array.isArray(data) ? data.slice(firstPostIndex, lastPostIndex) : [data]

  function Ban(data: any, typeban: string) {
    API.post('/sanction/' + typeban, data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(function (response: any) {
        setData(response.data)
        console.log(data)
        console.log(response.data)
        console.log('feito')
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setIsLoading(false))
  }
  function Solve(data: any) {
    API.patch('/denounce/markassolved', data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(function (response: any) {
        setData(response.data)
        console.log(data)
        console.log(response.data)
        console.log('feito')
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setIsLoading(false))
  }
  console.log(data)

  return (
    <div className="flex-1 p-6  font-bold h-screen overflow-y-auto">
      <div className={`py-2 mb-4 text-2xl font-semibold flex-1 `}>
        <h2>Claiming</h2>
      </div>

      <div
        className="  
                py-3     grid grid-flow-col sm:grid-cols-3"
      >
        <div className=" w-full px-2 py-2">User</div>
        <div className="  w-full border-x px-2 py-2 ">Reason</div>
        <div className=" w-full px-2 py-2   ">Status</div>
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          currentPosts.map((data) => (
            <div key={data.id}>
              {' '}
              <div
                className="
                m-2 border-4 border-gray-700 text-center rounded-lg
                    "
              >
                <div className="grid grid-cols-1   inline-y text-center md:grid-cols-2 xl:grid-flow-col ">
                  <div className="  w-full m-auto  border-gray-700  py-3   hover:bg-gray-200">
                    {data.denounced}
                  </div>
                  <div className="   border-gray-700 m-auto py-3  hover:bg-gray-200 w-full  ">
                    {data.reason}
                  </div>
                  <div className=" w-full  border-gray-700    m-auto hover:bg-gray-200 ">
                    <button
                      className={` ${
                        data.solved == false
                          ? 'bg-red-500 hover:bg-red-600 px-3.5 '
                          : 'bg-green-500 hover:bg-green-700 px-7 '
                      } text-sm w-full  py-4 m-auto text-white font-bold`}
                      onClick={() => Solve({ id: data.id })}
                    >
                      {data.solved == false ? 'Não lida ' : 'Lida'}
                    </button>
                  </div>
                  <div className=" border-gray-700   hover:bg-slate-900  hover:bg-gray-800 mx-auto w-full m-auto ">
                    <details className="  py-3.5 px-8 relative cursor-pointer bg-gray-900     hover:bg-gray-800 w-full  open:ring-1 open:ring-black/5 open:shadow-lg   transform-gpu delay-75 duration-100 ease-in-out ">
                      <summary className="  text-white dark:text-white font-semibold select-none">
                        Ban
                      </summary>
                      <div className="grid relative gap-2 ">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-sm py-2 px-2  text-white font-bold  "
                          onClick={() =>
                            Ban({ userid: UserId(), userban: data.denounced_id }, 'permanent')
                          }
                        >
                          Permanente
                        </button>
                        <button
                          className="bg-slate-800 text-sm hover:bg-slate-900 text-white font-bold py-2 px-2"
                          onClick={() =>
                            Ban(
                              {
                                userid: UserId(),
                                userban: data.denounced_id,
                                bantime: handlerdata()
                              },
                              'temporary'
                            )
                          }
                        >
                          Temporario
                        </button>
                      </div>
                    </details>
                  </div>
                </div>
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

export default Claiming
