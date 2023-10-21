import Image from "next/image";
import React from "react";

export const NavTop = ({ label }) => {
  return (
    <div className="flex items-center justify-between  py-10 ">
      <h1 className="text-3xl font-semibold  text-gray-600">{label}</h1>

      <div>
        <Image
          src="/dummy-photo.png"
          className="h-10 w-10 rounded-full"
          alt="photo"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};
