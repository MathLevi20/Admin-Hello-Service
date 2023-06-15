"use client";

import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import { PageProvider } from "@/contexts/PageContext";
import ServicesPage from "@/page/Service/Index";
import React from "react";

export default function page() {
  return (
      <PageProvider>
        <ServicesPage />
      </PageProvider>
  );
}
