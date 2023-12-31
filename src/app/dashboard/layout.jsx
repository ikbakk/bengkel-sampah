import Sidebar from "@/components/molecules/Sidebar";
import Image from "next/image";
import React from "react";
import QueryProvider from "@/components/templates/QueryProvider";

const LayoutAdmin = async ({ children }) => {
  return (
    <QueryProvider>
      <div className="grid h-screen grid-cols-10">
        <div className="col-span-2 max-h-screen  overflow-y-scroll  bg-bs-tertiary">
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
        <div className="col-span-8 max-h-screen overflow-y-scroll px-10">
          {children}
        </div>
      </div>
    </QueryProvider>
  );
};

export default LayoutAdmin;
