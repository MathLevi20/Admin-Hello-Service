"use client";

import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import { PageProvider } from "@/contexts/PageContext";
import Accounts from "@/page/Accounts/Accounts";
import React from "react";

const ProtectedAccounts = withAuth(Accounts, ["admin", "moderator"]); // Envolve o componente Dashboard com o HOC withAuth

export default function page() {
  return (
    <div className="flex">
      <PageProvider>
        <Nav />
        <ProtectedAccounts />
      </PageProvider>
    </div>
  );
}
