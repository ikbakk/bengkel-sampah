import { Button, Typography } from "@material-tailwind/react";
import React from "react";

const SellMethodButton = ({ label, selected = false, ...props }) => {
  const selectClass = selected
    ? "bg-bs-primary"
    : "outline outline-1 outline-bs-outline";
  return (
    <Button
      {...props}
      className="flex items-center gap-2 bg-transparent text-bs-font_primary outline outline-1 outline-bs-outline"
    >
      <div className={`${selectClass} h-4 w-4 rounded-full`}></div>
      <Typography variant="paragraph">{label}</Typography>
    </Button>
  );
};

export default SellMethodButton;
