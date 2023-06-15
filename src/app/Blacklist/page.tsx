"use client";

import Nav from "@/components/navbar";
import withAuth from "@/contexts/Acesscontrol";
import { PageProvider } from "@/contexts/PageContext";
import BlacklistPage from "@/page/Blacklist/index";
import React from "react";

export default function page() {
  return (
    <PageProvider>
      <BlacklistPage />
    </PageProvider>
  );
}
