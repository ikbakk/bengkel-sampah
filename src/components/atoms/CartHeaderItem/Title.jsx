"use client";
import { Typography } from "@material-tailwind/react";

const CartHeaderTitle = ({ title }) => {
  return (
    <Typography
      className="z-10 text-center md:text-left"
      variant="h4"
      color="white"
    >
      {title}
    </Typography>
  );
};

export default CartHeaderTitle;
