import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-24 ">
      <div
        className="spinner-border items-center animate-spin                     
        transition duration-1000
        block w-8 h-8 rounded-full m-12"
        role="status"
      >
        <img src="/reboot.png" width="40" />
      </div>
    </div>
  )
}

export default Loading
