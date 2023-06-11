"use client";
import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import { PageProvider } from "@/contexts/PageContext";
import Dashboard from "@/page/Dashboard/Index";
import React from "react";
// Importe o HOC withAuth corretamente, substituindo o '@/path/to/withAuth' pelo caminho correto

const ProtectedDashboard = withAuth(Dashboard, ["admin"]); // Envolve o componente Dashboard com o HOC withAuth

export default function Page() {
  return (
    <div className="flex-row md:flex w-full">
      <PageProvider>
        <Nav />
        <ProtectedDashboard />{" "}
        {/* Renderize o componente ProtectedDashboard, que foi envolvido com o HOC withAuth */}
      </PageProvider>
    </div>
  );
}
