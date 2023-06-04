"use client";

import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import Services from "@/page/Service/Index";
import React from "react";
const ProtectedServices = withAuth(Services, ["admin"]); // Envolve o componente Dashboard com o HOC withAuth

export default function page() {
  return (
    <div className="flex">
      <Nav />
      <ProtectedServices />
    </div>
  );
}
