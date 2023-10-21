import SidebarItem from "@/components/atoms/SidebarItem";
import { NAVBAR_ITEM } from "@/utils/constant/navbar";
import React from "react";
import { MdSpaceDashboard } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-3">
      {NAVBAR_ITEM.map((item) => {
        return (
          <SidebarItem
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
