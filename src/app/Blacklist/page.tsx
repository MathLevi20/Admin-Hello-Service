"use client";

import Nav from "@/components/navbar";
import withAuth from "@/contexts/Acesscontrol";
import { PageProvider } from "@/contexts/PageContext";
import Blacklist from "@/page/Blacklist";

import React from "react";

const ProtectedBlacklist = withAuth(Blacklist, ["admin", "moderator"]); // Envolve o componente Dashboard com o HOC withAuth

export default function page() {
  return (
    <div className="flex">
      <PageProvider>
        <Nav />
        <ProtectedBlacklist />
      </PageProvider>
    </div>
  );
}
