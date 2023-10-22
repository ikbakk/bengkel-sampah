"use client";

import { Button, Typography } from "@material-tailwind/react";
import Minus from "@/components/atoms/Icons/Minus";
import Plus from "@/components/atoms/Icons/Plus";

const CartQuantityItemCounter = ({ totalWeight, unit }) => {
  return (
    <div>
      <Typography className="text-center">Estimasi Berat/{unit}</Typography>
      <div className="flex items-center justify-center gap-4">
        <Button size="sm" variant="filled" className="bg-gray-400">
          <Minus className="h-4 w-4" />
        </Button>
        <p className="font-bold">{totalWeight}</p>
        <Button size="sm" variant="filled" className="bg-bs-primary">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartQuantityItemCounter;
