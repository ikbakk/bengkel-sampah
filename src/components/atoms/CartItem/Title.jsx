"use client";
import { Typography } from "@material-tailwind/react";

const CartHeaderTitle = ({ title }) => {
  return (
    <Typography className="z-10 hidden md:block" variant="h4" color="white">
      {title}
    </Typography>
  );
};

export default CartHeaderTitle;
