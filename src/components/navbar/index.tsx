import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { motion } from "framer-motion";
import {
  BsArrow90DegDown,
  BsFillArrowLeftCircleFill,
  BsPerson,
} from "react-icons/bs";
import { AiOutlineAppstore } from "react-icons/ai";
import { HiOutlineDatabase } from "react-icons/hi";
import { SlSettings } from "react-icons/sl";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  let isTabletMid = useMediaQuery({ query: "(max-width: 767px)" });

  const toggleSidebar = () => {
    setOpen(!open);
  };
  const Menus = [
    {
      title: "Dashboard",
      src: "/Share.png",
      path: "/Dashboard",
    },
    {
      title: "Services",
      src: "/Seach.png",
      path: "/Services",
    },
    {
      title: "Contract",
      src: "/Contract.png",
      path: "/Contract",
    },
    {
      title: "Administrator",
      src: "/Tool.png",
      path: "/Admin",
    },
    {
      title: "Accounts",
      src: "/Contact.png",
      gap: true,
      path: "/Accounts",
    },
    {
      title: "BlackList ",
      src: "/Lock.png",
      path: "/Blacklist",
    },
    {
      title: "Claiming",
      src: "/Key.png",

      path: "/Claiming",
    },
    {
      title: "Log ",
      src: "/file.png",
      path: "/Log",
    },
    {
      title: "Setting",
      src: "/Setting.png",
      gap: true,
      path: "/Settings",
    },
  ];

  return (
    <div className="">
      <div
        className={`absolute inset-0 bg-black/50 ${
          open ? "block" : "hidden"
        } md:hidden`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed bg-yellow-300 h-100 p-10 transition-transform  min-h-screen duration-400 overflow-y-visible transform ${
          open ? "translate-x-0 w-60" : "w-10 md:w-20 -translate-x-full "
        } ${
          isTabletMid && !open ? "hidden" : ""
        }  md:translate-x-0 md:static  md:p-4 relative `}
      >
        <Image
          alt="control"
          src="/control.png"
          className={`absolute cursor-pointer  rounded-full 
       -right-3 top-9 w-7 border-2 border-yellow-300 ${!open && "rotate-180"} `}
          width={50}
          height={50}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <Image
            alt="logo"
            src="/logo.svg"
            className={`cursor-pointer  duration-300 ${
              open && "rotate-[360deg]"
            }`}
            width={50}
            height={50}
          />
          <h1
            className={`text-gray-800 font-medium origin-left text-xl duration-100 ${
              !open && "scale-0"
            }`}
          >
            Hello Service
          </h1>
        </div>

        <ul className="pt-2">
          {Menus.map((menu) => (
            <div key={menu.title}>
              <Link href={menu.path}>
                <li
                  className={`text-gray-800 text-sm cursor-pointer flex items-center gap-x-4 p-2
               hover:bg-slate-200 rounded-md ${menu.gap ? "mt-5" : "mt-2"}`}
                >
                  <Image
                    alt="icon"
                    src={`${menu.src}`}
                    width={25}
                    height={25}
                  />
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {menu.title}
                  </span>
                </li>
              </Link>
            </div>
          ))}
        </ul>

        <motion.div
          onClick={toggleSidebar}
          animate={
            open
              ? {
                  x: -10,
                  y: -200,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        ></motion.div>
      </div>
      <div className="absolute">
        <div
          className="relative p-1 ml-2 my-6 md:hidden cursor-pointer"
          onClick={toggleSidebar}
        >
          <MdMenu
            className={`cursor-pointer relative rounded-full 
       left-1 top-0 w-10 border-yellow-300 ${!open ? " " : "hidden"} `}
            size={40}
            onClick={() => toggleSidebar}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
