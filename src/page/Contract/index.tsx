import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import { PageContext } from "@/contexts/PageContext";
import React, { useContext } from "react";
import Contract from "./Contract";
const ContractDashboard = withAuth(Contract, ["admin"]); // Envolve o componente Contract com o HOC withAuth

function ContractPage() {
  const pageContext = useContext(PageContext);
  if (!pageContext) {
    return null;
  }
  const { isPageOpen, togglePage, themePage, theme } = pageContext;

  return (
    <div className={` ${isPageOpen ? "flex" : "flex-row"} md:flex w-full`}>
      <Nav />
      <ContractDashboard />
    </div>
  );
}

export default ContractPage;
