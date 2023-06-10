"use client";

import Nav from "@/components/navbar";
import withAuth from "@/contexts/Acesscontrol";
import { PageProvider } from "@/contexts/PageContext";
import ClaimingPage from "@/page/Claiming/Index";
import React from "react";

export default function page() {
  return (
    <PageProvider>
      <ClaimingPage />
    </PageProvider>
  );
}
