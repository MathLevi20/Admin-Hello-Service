import Nav from '@/components/navbar/index'
import { PageContext } from '@/contexts/PageContext';
import { useContext, useState } from 'react'
import Logout from './Logout'

export const Settings = () => {
       const pageContext = useContext(PageContext);
       if (!pageContext) {
         return null;
       }
       const { isPageOpen, togglePage, themePage, theme } = pageContext;

  return(
   <div className={` ${isPageOpen ? "flex" : "flex-row"} md:flex w-full`}>
     <Nav />
     <Logout />
     </div>)
}

export default Settings
