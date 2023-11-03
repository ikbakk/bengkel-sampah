import Link from "next/link";
import React from "react";

const SidebarItem = ({ href, label, icon }) => {
  return (
    <Link
      href={href}
      className="flex flex-row items-center justify-center gap-2 px-10 py-2 text-bs-primary transition-all hover:bg-bs-secondary  hover:text-white lg:justify-start lg:py-4  "
    >
      <div>{icon}</div>
      <p className="hidden text-lg text-black lg:block">{label}</p>
    </Link>
  );
};

export default SidebarItem;
