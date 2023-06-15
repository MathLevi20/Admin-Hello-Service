import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import { PageContext } from "@/contexts/PageContext";
import React, { useContext } from "react";
import Accounts from "./Accounts";

const ProtectedAccounts = withAuth(Accounts, ["admin", "moderator"]); // Envolve o componente Dashboard com o HOC withAuth

function AccountsPage() {
  const pageContext = useContext(PageContext);
  if (!pageContext) {
    return null;
  }
  const { isPageOpen, togglePage, themePage, theme } = pageContext;

  return (
    <div className={` ${isPageOpen ? "flex" : "flex-row"} md:flex w-full`}>
      <Nav />
      <ProtectedAccounts />
    </div>
  );
}

export default AccountsPage;
