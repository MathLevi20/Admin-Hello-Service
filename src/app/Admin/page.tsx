"use client";

import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { PageProvider } from "@/contexts/PageContext";
import AdminPage from "@/page/Admin/Index";
import React from "react";

export default function page() {
  return (
    <AuthContextProvider>
      <PageProvider>
        <AdminPage />
      </PageProvider>
    </AuthContextProvider>
  );
}
