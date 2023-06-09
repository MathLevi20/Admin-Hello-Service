import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex items-center mt-5 p-3  rounded-md m-auto justify-center ">
      <div className="spinner-border block animate-spin">
        <Image src="/loading_!.png" width={25} height={25} alt="Loading" />
      </div>
    </div>
  );
};

const CustomClass = () => {
  return (
    <h6 className="font-semibold mt-5 p-3 rounded-md bg-slate-600 font-mono text-md text-white hover:text-slate-200">
      Entre
    </h6>
  );
};

export { Loading, CustomClass };
