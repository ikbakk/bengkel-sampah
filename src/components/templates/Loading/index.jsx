"use client";

import { Spinner } from "@material-tailwind/react";
import React from "react";

const Loading = () => {
  return (
    <div className="bg-primaryimage flex min-h-screen w-full items-center justify-center">
      <div className="screen flex h-[560px] w-full max-w-3xl items-center justify-center gap-4 rounded-xl bg-white p-4">
        <h1>This will be a Loading component/Page</h1>
        <Spinner color="orange" />
      </div>
    </div>
  );
};

export default Loading;
