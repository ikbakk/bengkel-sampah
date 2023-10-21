"use client";
import { Typography } from "@material-tailwind/react";

const CartHeaderTitle = ({ title }) => {
  return (
    <Typography className="z-10" variant="h4" color="white">
      {title}
    </Typography>
  );
};

export default CartHeaderTitle;
