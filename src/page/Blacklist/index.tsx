import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import { PageContext } from "@/contexts/PageContext";
import React, { useContext } from "react";
import Blacklist from "./Blacklist";

const ProtectedBlacklist = withAuth(Blacklist, ["admin", "moderator"]); // Envolve o componente Dashboard com o HOC withAuth

function BlacklistPage() {
  const pageContext = useContext(PageContext);
  if (!pageContext) {
    return null;
  }
  const { isPageOpen, togglePage, themePage, theme } = pageContext;

  return (
    <div className={` ${isPageOpen ? "flex" : "flex-row"} md:flex w-full`}>
      <Nav />
      <ProtectedBlacklist />
    </div>
  );
}

export default BlacklistPage;
