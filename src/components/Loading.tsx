import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex items-center h-screen m-auto justify-center py-24 ">
      <div
        className="spinner-border items-center animate-spin                     
        transition duration-1000
        block w-8 h-8 rounded-full m-12"
        role="status"
      >
        <Image src="/reboot.png" alt="Reboot Logo" width={40} height={40} />
      </div>
    </div>
  );
};

export default Loading;
