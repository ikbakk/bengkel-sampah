import CardNews from "@/components/molecules/CardNews";
import { NavTop } from "@/components/molecules/NavTop";
import React from "react";

const DashboardProfile = () => {
  return (
    <div>
      <NavTop label={"Berita"} />
      <div className="grid grid-cols-1 gap-5">
        <CardNews />
        <CardNews />
        <CardNews />
        <CardNews />
        <CardNews />
        <CardNews />
        <CardNews />
        <CardNews />
      </div>
    </div>
  );
};

export default DashboardProfile;
