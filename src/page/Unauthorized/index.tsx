import Nav from "@/components/navbar/index";
import { PageContext } from "@/contexts/PageContext";
import { useContext, useState } from "react";
import Unauthorized from "./Unauthorized";
import withAuth from "@/contexts/Acesscontrol";

const ProtectedUnauthorized = withAuth(Unauthorized, ["admin", "moderator"]); // Envolve o componente Dashboard com o HOC withAuth

export const UnauthorizedPage = () => {
  const pageContext = useContext(PageContext);
  if (!pageContext) {
    return null;
  }
  const { isPageOpen, togglePage, themePage, theme } = pageContext;

  return (
    <div className={` ${isPageOpen ? "flex" : "flex-row"} md:flex w-full`}>
      <Nav />
      <ProtectedUnauthorized />
    </div>
  );
};

export default UnauthorizedPage;
