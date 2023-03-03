import React from 'react'
import Image from 'next/image'
const Loading = () => {
  return (
      <div
        className="spinner-border items-center animate-spin                     
        transition duration-1000
        block w-8 h-8 mx-auto rounded-full "
        role="status"
      > 
        <Image src="/loading_!.png" width="40"height={40} alt="Loading" />
      </div>
  )
}

export default Loading
