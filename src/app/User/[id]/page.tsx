"use client";

import Nav from "@/components/navbar/index";
import withAuth from "@/contexts/Acesscontrol";
import { PageContext, PageProvider } from "@/contexts/PageContext";
import User from "@/page/User/User";
import React, { useContext } from "react";

export default function Page({ params }: any) {
  return (
    <PageProvider>
      <User id={params.id} />
    </PageProvider>
  );
}
