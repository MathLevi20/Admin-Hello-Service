import Nav from "@/components/navbar/index";
import React from "react";
import Contract_list from ".";

const Contract = () => {
  return (
    <div className=" flex-row md:flex w-full">
      <Nav />
      <div className="flex-1 p-6 font-bold overflow-y-auto">
        <div className={`py-2 mb-4 text-2xl font-semibold flex-1 `}>
          <h2>Contratos</h2>
          <div className="mt-3 pt-0">
            <Contract_list />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contract;
