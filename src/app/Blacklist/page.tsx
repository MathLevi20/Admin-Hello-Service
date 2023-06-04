"use client";

import Nav from "@/components/navbar";
import withAuth from "@/contexts/Acesscontrol";
import Blacklist from "@/page/Blacklist";

import React from "react";

const ProtectedBlacklist = withAuth(Blacklist, ["admin", "moderator"]); // Envolve o componente Dashboard com o HOC withAuth

export default function page() {
  return (
    <div className="flex">
      <Nav />
      <ProtectedBlacklist />
    </div>
  );
}
