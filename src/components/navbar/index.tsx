import { useContext, useState } from "react";
import { MdMenu, MdOutlineChevronRight, MdOutlineClose } from "react-icons/md";
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
import "src/page/globals.css"; // Importe o arquivo CSS personalizado
import { CloseOutlined } from "@ant-design/icons";
import { PageContext } from "@/contexts/PageContext";

const Sidebar = () => {
  const pageContext = useContext(PageContext);

  let isTabletMid = useMediaQuery({ query: "(max-width: 767px)" });
  if (!pageContext) {
    return null;
  }
  const { isPageOpen, togglePage, themePage, theme } = pageContext;

  const toggleSidebar = () => {
    togglePage();
  };
  console.log(isPageOpen);
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
    <div className="flex">
      <div className="bg-black-300">
        <header className="flex justify-end">
          <div className="flex">
            <div className="md:hidden cursor-pointer">
              <div className={`flex my-5 ml-4 ${!isPageOpen ? "" : "hidden"}`}>
                <MdMenu
                  className={`m-auto cursor-pointer rounded-full border-yellow-300 ${
                    !isPageOpen ? "" : "hidden"
                  }`}
                  size={40}
                  onClick={toggleSidebar}
                />
                <Image
                  alt="logo"
                  src="/logo.svg"
                  className="cursor-pointer p-2 duration-300"
                  width={50}
                  height={50}
                />

                <h1 className="text-gray-800 m-auto gap-2 font-medium origin-left text-xl duration-100">
                  Hello Service
                </h1>
              </div>
              <div className={!isPageOpen ? "" : "hidden"}></div>
            </div>
          </div>
        </header>
      </div>
      <div className={` md:flex ${!isPageOpen ? "hidden" : ""}`}>
        <div
          className={`  bg-black/50 ${isPageOpen ? "block" : "hidden"} `}
          onClick={toggleSidebar}
        ></div>
        <div
          className={` bg-yellow-300  h-full p-10 transition-transform   min-h-screen duration-400  transform ${
            isPageOpen
              ? "translate-x-0 w-60 absolute"
              : "w-10 md:w-20 -translate-x-full "
          } overflow-x-hidden scrollable-container   overflow-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent${
            isTabletMid && !isPageOpen ? "hidden" : ""
          }  md:translate-x-0 md:static  md:p-4 relative `}
        >
          {" "}
          <div className="relative"></div>
          <div className="flex gap-x-4 items-center">
            <Image
              alt="logo"
              src="/logo.svg"
              className={`cursor-pointer  duration-300 ${
                isPageOpen && "rotate-[360deg]"
              }`}
              width={50}
              height={50}
            />
            <h1
              className={`text-gray-800 font-medium origin-left text-xl duration-100 ${
                !isPageOpen && "scale-0"
              }`}
            >
              Hello Service
            </h1>
            <div className=" rounded-lg hover:bg-gray-200 ">
              <MdOutlineClose
                className={`text-gray-800 font-medium origin-left text-xl duration-100 ${
                  !isPageOpen && "scale-0"
                }`}
                size={35}
                onClick={toggleSidebar}
              />
            </div>
          </div>
          <MdOutlineChevronRight
            className={`cursor-pointer rounded-lg m-auto bg-gray-200  hover:bg-gray-300  
     border-2 border-yellow-300 hover: ${!isPageOpen ? "" : "hidden"} `}
            size={40}
            onClick={toggleSidebar}
          />
          <ul className="pt-2">
            {Menus.map((menu) => (
              <div key={menu.title}>
                <Link href={menu.path}>
                  <li
                    className={`text-gray-800 text-sm cursor-pointer flex items-center gap-x-4 p-2.5
               hover:bg-slate-200 rounded-md ${menu.gap ? "mt-5" : "mt-2"}`}
                  >
                    <Image
                      alt="icon"
                      src={`${menu.src}`}
                      width={25}
                      height={25}
                    />
                    <span
                      className={`${
                        !isPageOpen && "hidden"
                      } origin-left duration-200`}
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
              isPageOpen
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
      </div>
    </div>
  );
};

export default Sidebar;
