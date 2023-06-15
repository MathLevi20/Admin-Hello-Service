import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import { PageContext } from "@/contexts/PageContext";
import React, { useContext } from "react";
import Dashboard from "./Dashboard";
const ProtectedDashboard = withAuth(Dashboard, ["admin"]); // Envolve o componente Dashboard com o HOC withAuth

function DashboardPage() {
  const pageContext = useContext(PageContext);
  if (!pageContext) {
    return null;
  }
  const { isPageOpen, togglePage, themePage, theme } = pageContext;

  return (
    <div className={` ${isPageOpen ? "flex" : "flex-row"} md:flex w-full`}>
      <Nav />
      <ProtectedDashboard />
    </div>
  );
}

export default DashboardPage;
