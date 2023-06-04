"use client";

import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import Contract from "@/page/Contract/Contract";
import React from "react";

const ProtectedContract = withAuth(Contract, ["admin"]); // Envolve o componente Dashboard com o HOC withAuth

export default function page() {
  return (
    <div className="flex">
      <Nav />
      <ProtectedContract />
    </div>
  );
}
