"use client";

import Nav from "@/components/navbar";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { PageProvider } from "@/contexts/PageContext";
import Claiming from "@/page/Claiming/Claiming";
import Dashboard from "@/page/Dashboard/Index";
import Settings from "@/page/Settings/Index";
import React from "react";

export default function page() {
  return (
    <AuthContextProvider>
      <PageProvider>
        <Settings />
      </PageProvider>
    </AuthContextProvider>
  );
}
