"use client";

import { Login } from "@/page/Login";
import React from "react";
import { AuthContextProvider } from "../../contexts/AuthContext";

export default function page() {
  return (
    <AuthContextProvider>
      <Login />
    </AuthContextProvider>
  );
}
