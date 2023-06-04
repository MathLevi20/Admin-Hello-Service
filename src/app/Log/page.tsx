"use client";

import Nav from "@/components/navbar";
import withAuth from "@/contexts/Acesscontrol";
import Dashboard from "@/page/Dashboard/Index";
import Log from "@/page/Log/Log";
import React from "react";

const ProtectedLog = withAuth(Log, ["admin", "moderator"]); // Envolve o componente Dashboard com o HOC withAuth

export default function page() {
  return (
    <div className="flex">
      <Nav />
      <ProtectedLog />
    </div>
  );
}
