"use client";

import withAuth from "@/contexts/Acesscontrol";
import { AuthContextProvider } from "@/contexts/authContext";
import { Register } from "@/page/Register/Index";
import React from "react";
const ProtectedRegister = withAuth(Register, ["admin"]); // Envolve o componente Dashboard com o HOC withAuth

export default function page() {
  return (
    <div>
      <AuthContextProvider>
        <ProtectedRegister />
      </AuthContextProvider>
    </div>
  );
}
