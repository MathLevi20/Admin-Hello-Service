"use client";

import { PageProvider } from "@/contexts/PageContext";
import AccountsPage from "@/page/Accounts";
import React from "react";


export default function page() {
  return (
    <PageProvider>
      <AccountsPage />
    </PageProvider>
  );
}
