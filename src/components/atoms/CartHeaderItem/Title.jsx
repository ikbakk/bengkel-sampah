"use client";
import { Typography } from "@material-tailwind/react";

const CartHeaderTitle = ({ title }) => {
  return (
    <Typography
      className="z-10 mb-4 w-full text-center text-bs-font_primary md:text-left"
      variant="h4"
    >
      {title}
    </Typography>
  );
};

export default CartHeaderTitle;
