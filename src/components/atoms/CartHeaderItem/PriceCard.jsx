"use client";

import { Typography } from "@material-tailwind/react";

const PriceCard = ({ title, value, icon }) => {
  return (
    <div className="flex w-[200px] flex-col items-center text-bs-font_primary">
      <div className=" flex flex-col text-left text-sm font-normal lg:text-lg">
        <Typography>{title}</Typography>
        <Typography className="flex items-center justify-center gap-2 text-base font-bold lg:text-2xl">
          <span>{icon}</span>
          {value}
        </Typography>
      </div>
    </div>
  );
};

export default PriceCard;
