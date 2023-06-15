"use client";

import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import { PageProvider } from "@/contexts/PageContext";
import ContractPage from "@/page/Contract";
import Contract from "@/page/Contract/Contract";
import React from "react";

export default function Page() {
  return (
    <PageProvider>
      <ContractPage />
    </PageProvider>
  );
}
