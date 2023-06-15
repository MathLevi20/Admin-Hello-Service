"use client";

import withAuth from "@/contexts/Acesscontrol";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { Register } from "@/page/Register/Index";
import React from "react";
const ProtectedRegister = withAuth(Register, ["admin"]); // Envolve o componente Dashboard com o HOC withAuth

export default function page() {
  return (
    <AuthContextProvider>
      <ProtectedRegister />
    </AuthContextProvider>
  );
}
