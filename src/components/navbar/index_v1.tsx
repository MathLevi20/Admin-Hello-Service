'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'

export const Nav = () => {
  const [open, setOpen] = useState(true)
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });

  const Menus = [
    {
      title: 'Dashboard',
      src: '/Share.png',
      path: '/Dashboard'
    },
    {
      title: 'Services',
      src: '/Seach.png',
      path: '/Services'
    },
    {
      title: 'Contract',
      src: '/Contract.png',
      path: '/Contract'
    },
    {
      title: 'Administrator',
      src: '/Tool.png',
      path: '/Admin'
    },
    {
      title: 'Accounts',
      src: '/Contact.png',
      gap: true,
      path: '/Accounts'
    },
    {
      title: 'BlackList ',
      src: '/Lock.png',
      path: '/Blacklist'
    },
    {
      title: 'Claiming',
      src: '/Key.png',

      path: '/Claiming'
    },
    {
      title: 'Log ',
      src: '/file.png',
      path: '/Log'
    },
    {
      title: 'Setting',
      src: '/Setting.png',
      gap: true,
      path: '/Settings'
    }
  ]

  return (
    <div className="relative  ">
      <div
        className={`${
          open ? 'w-55' : 'w-10 sm:w-20 '
        } p-5 pt-5 duration-300 h-full bg-yellow-300 relative `}
      >
        <Image
        alt="control"
        src="/control.png"
        className={`absolute cursor-pointer  rounded-full 
       -right-3 top-9 w-7 border-2 border-yellow-300 ${!open && 'rotate-180'} `}
       width={50}
       height={50}
        onClick={() => setOpen(!open)}
        />
        <div>
          <div className="flex gap-x-4 items-center">
            <Image
            alt="logo"
              src="/logo.svg"
              className={`cursor-pointer  duration-300 ${open && 'rotate-[360deg]'}`}
              width={50}
              height={50}
            />
            <h1
              className={`text-gray-800 font-medium origin-left text-xl duration-300 ${
                !open && 'scale-0'
              }`}
            >
              Hello Service
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((menu) => (
              <div key={menu.title}>
                <Link href={menu.path}>
                  <li
                    className={`text-gray-800 text-sm cursor-pointer flex items-center gap-x-4 p-2
               hover:bg-slate-200 rounded-md ${menu.gap ? 'mt-5' : 'mt-2'}`}
                  >
                    <Image alt="icon" src={`${menu.src}` }     width={25}
              height={25} />
                    <span className={`${!open && 'hidden'} origin-left duration-200`}>
                      {menu.title}
                    </span>
                  </li>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Nav
