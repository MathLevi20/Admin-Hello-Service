import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import { PageContext } from "@/contexts/PageContext";
import React, { useContext } from "react";
import Claiming from "./Claiming";
const ProtectedClaiming = withAuth(Claiming, ["admin", "moderator"]); // Envolve o componente Dashboard com o HOC withAuth

function ClaimingPage() {
  const pageContext = useContext(PageContext);
  if (!pageContext) {
    return null;
  }
  const { isPageOpen, togglePage, themePage, theme } = pageContext;

  return (
    <div className={` ${isPageOpen ? "flex" : "flex-row"} md:flex w-full`}>
      <Nav />
      <ProtectedClaiming />
    </div>
  );
}

export default ClaimingPage;
