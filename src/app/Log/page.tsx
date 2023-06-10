"use client";

import Nav from "@/components/navbar";
import withAuth from "@/contexts/Acesscontrol";
import { PageContext, PageProvider } from "@/contexts/PageContext";
import Dashboard from "@/page/Dashboard/Index";
import LogPage from "@/page/Log/Index";
import Log from "@/page/Log/Log";
import React, { useContext } from "react";

export default function Page() {
  return (
    <PageProvider>
      <LogPage />
    </PageProvider>
  );
}
