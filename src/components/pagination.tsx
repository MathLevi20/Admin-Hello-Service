import React from 'react'

// eslint-disable-next-line react/prop-types
const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage
}: {
  totalPosts: number
  postsPerPage: number
  setCurrentPage: any
  currentPage: any
}) => {
  const pages = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i)
  }
  const u = pages.slice(-1)

  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={
              page == currentPage
                ? 'active p-2 px-3  m-1 border-yellow-500 border '
                : 'p-2 m-1 px-2  border-gray-500 border'
            }
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}

export default Pagination
