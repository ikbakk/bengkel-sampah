"use client";

import { Spinner } from "@material-tailwind/react";
import Image from "next/image";
import logo from "public/logo-bengkel-sampah-warna.png";
import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-primaryimage">
      <div className="screen flex h-[90vh] w-[90%] max-w-3xl flex-col items-center justify-center gap-4 rounded-xl bg-white p-4">
        <Image
          src={logo}
          alt="logo bengkel sampah"
          width={160}
          height={80}
          placeholder="empty"
          className="animate-bounce"
        />
        <div className="flex items-center justify-center gap-6">
          <h1>This will be a Loading component/Page</h1>
          <Spinner color="orange" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
