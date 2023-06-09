"use client";

import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import { AuthContextProvider } from "@/contexts/authContext";
import Admin from "@/page/Admin/Index";
import React from "react";

const ProtectedAdmin = withAuth(Admin, ["admin"]); // Envolve o componente Dashboard com o HOC withAuth

export default function page() {
  return (
    <div className="flex h-screen">
      <AuthContextProvider>
        <Nav/>
        <ProtectedAdmin />
      </AuthContextProvider>
    </div>
  );
}
