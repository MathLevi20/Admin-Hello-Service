"use client";
import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import { PageProvider } from "@/contexts/PageContext";
import DashboardPage from "@/page/Dashboard/Index";
import Dashboard from "@/page/Dashboard/Index";
import React from "react";
// Importe o HOC withAuth corretamente, substituindo o '@/path/to/withAuth' pelo caminho correto


export default function Page() {
  return (
    <PageProvider>
      <DashboardPage />
    </PageProvider>
  );
}
