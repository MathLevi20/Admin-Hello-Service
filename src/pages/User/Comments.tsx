import { FunctionComponent } from 'react'

type User = {
  by: string
  msg: string
}

export const Comments: FunctionComponent<User> = ({ by, msg }) => (
  <div className="mx-auto mb-2 text-white">
    <div className="flex  border-[1px] bg-gray-700  rounded-xl   border-inherit ">
      <div className="flex flex-col  my-auto w-full">
        <div className="m-2  divide-y w-max">@{by} commented on</div>
        <div className="p-2 hover:bg-gray-600 border-t-[1px] rounded-b-xl ">{msg}</div>
      </div>
    </div>
  </div>
)

export default Comments
