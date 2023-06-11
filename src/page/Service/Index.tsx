import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import { PageContext } from "@/contexts/PageContext";
import React, { useContext } from "react";
import Service from "./Service";
const ProtectedService = withAuth(Service, ["admin"]); // Envolve o componente Dashboard com o HOC withAuth

function ServicePage() {
  const pageContext = useContext(PageContext);
  if (!pageContext) {
    return null;
  }
  const { isPageOpen, togglePage, themePage, theme } = pageContext;

  return (
    <div className={` ${isPageOpen ? "flex" : "flex-row"} md:flex w-full`}>
      <Nav />
      <ProtectedService />
    </div>
  );
}

export default ServicePage;
