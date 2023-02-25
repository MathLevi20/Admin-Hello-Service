import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import ContractPost from './PostContract'
import Set from './PutContract'
import Contract from '../../pages/Contract/Contract'
import { API, UserId } from '../../Services/client'
import Loading from '../../components/Loading'
import { title } from 'process'
import Pagination from '../../components/pagination'

interface Contract {
  id: string
  name: string
  content: string
  creator: string
}

export const Contract_list = () => {
  const [data, setData] = useState<Contract[]>([])
  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(11)
  const [search, setSearch] = useState('')

  function togglePopup() {
    setPopupVisible(!popupVisible)
  }

  useEffect(() => {
    try {
      // eslint-disable-next-line prettier/prettier
      API.get('/userterm/')
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
  console.log(typeof data)

  async function Delete(id: string) {
    API.delete('/userterm/delete', {
      data: {
        id: id
      }
    })
      .then(function (response: any) {
        console.log('feito')

        setIsLoading(true)
        window.location.reload()
      })
      .catch(function (error: any) {
        console.error(error)
      })
      .finally(() => setIsLoading(false))
  }
  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = data.slice(firstPostIndex, lastPostIndex)

  function changedata(data: any) {
    if (search == '') {
      const currentPosts = data.slice(firstPostIndex, lastPostIndex)

      return currentPosts
    }

    return data
  }

  return (
    <div>
      <div className="mb-5 w-full flex justify-center pt-0">
        <input
          type="text"
          placeholder={'Procurar'}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          className="px-4 py-3 flex justify-center w-3/4 placeholder-slate-900 text-black relative  rounded text-lg border-2 outline-none text-left "
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="py-3">
          <div>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <ContractPost descricao={''} title={''} id={Object.keys(data).length + 10} />
              {data
                .filter((data) => {
                  console.log(data.name)
                  if (data.name.toLowerCase().includes(search.toLowerCase())) {
                    return data
                  }
                })
                .map((data) => (
                  // eslint-disable-next-line react/jsx-key
                  <div>
                    <div
                      className="
                      block
                      px-3
                      py-3
                      border border-gray-400 mb-2
                      w-full
                      rounded-md
                      text-black
                      cursor-pointer
                      hover:bg-gray-100
                        text-[20px]
                    "
                      key={data.id}
                    >
                      <div className="flex justify-between ">
                        <button className="" onClick={togglePopup}>
                          <div className="text-left pl-1">{data.name}</div>
                          <Set descricao={data.content} title={data.name} id={data.id} />
                        </button>
                        <button className="flex justify-start" onClick={() => Delete(data.id)}>
                          <img src="/cancel.svg" width="20" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
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
      )}
    </div>
  )
}

export default Contract_list
