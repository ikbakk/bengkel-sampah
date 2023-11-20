"use client";
import React from "react";
import ProfileMenu from "@/components/atoms/ProfileMenu";

export const NavTop = ({ label }) => {
  return (
    <div className="flex items-center justify-between  py-10 ">
      <h1 className="text-xl font-semibold text-gray-600  lg:text-3xl">
        {label}
      </h1>

      <div>
        <ProfileMenu />
      </div>
    </div>
  );
};
