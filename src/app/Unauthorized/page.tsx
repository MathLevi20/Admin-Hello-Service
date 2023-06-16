"use client";

import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import { PageProvider } from "@/contexts/PageContext";
import UnauthorizedPage from "@/page/Unauthorized";
import React from "react";

export default function page() {
  return (
    <PageProvider>
      <UnauthorizedPage />
    </PageProvider>
  );
}
