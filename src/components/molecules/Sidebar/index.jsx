"use client";

import SidebarItem from "@/components/atoms/SidebarItem";
import { ADMIN_NAVBAR_ITEM, NAVBAR_ITEM } from "@/utils/constant/navbar";
import { usePathname } from "next/navigation";
import React from "react";
import { MdSpaceDashboard } from "react-icons/md";

const Sidebar = () => {
  const pathName = usePathname();
  // console.log(pathName);

  return (
    <div className="flex flex-col gap-3">
      {pathName.startsWith("/dashboard")
        ? NAVBAR_ITEM.map((item) => {
            return (
              <SidebarItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
              />
            );
          })
        : pathName.startsWith("/admin")
        ? ADMIN_NAVBAR_ITEM.map((item) => {
            return (
              <SidebarItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
              />
            );
          })
        : ""}
    </div>
  );
};

export default Sidebar;
