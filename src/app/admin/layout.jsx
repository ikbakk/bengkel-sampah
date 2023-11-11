import Sidebar from "@/components/molecules/Sidebar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const LayoutAdmin = ({ children }) => {
  return (
    <div className="grid h-screen grid-cols-10">
      <div className="max-h-screen col-span-2 overflow-y-scroll bg-bs-tertiary">
        <div className="flex items-center justify-center">
          <Image
            src="/logo-bs.png"
            width={100}
            height={100}
            alt="logo-bengkel-sampah"
            className="w-60"
          />
        </div>
        <div className="mt-5">
          <Sidebar />
        </div>
      </div>
      <div className="max-h-screen col-span-8 px-10 overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default LayoutAdmin;
