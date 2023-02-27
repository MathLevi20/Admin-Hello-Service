/* eslint-disable prettier/prettier */
/* eslint-disable react/function-component-definition */
import React, { FunctionComponent } from 'react'
type User = {
    Title: string
    Users: number
  }

export const Card: FunctionComponent<User> = ({Title,Users}) =>(

    <div>
    <div className="
              block
         
              py-3         
              border border-white mb-2
              rounded-md
              text-xl font-normal
              bg-yellow-500
              hover:bg-gray-800 
              text-gray-800
              hover:text-white
              cursor-pointer
              text-center
              w-60 h-30">
    <div className="p-1">
      <div>{Title}</div>
      <div>{Users}</div>
    </div>
    </div>
    </div>
)
