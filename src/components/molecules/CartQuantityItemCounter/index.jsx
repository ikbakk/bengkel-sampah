"use client";

import { Button, Typography } from "@material-tailwind/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const CartQuantityItemCounter = ({ totalWeight, handleAdd, handleReduce }) => {
  const disableButton = totalWeight <= 0 ? true : false;
  return (
    <div>
      <Typography className="text-center">Estimasi Berat</Typography>
      <div className="flex items-center justify-center gap-4">
        <Button
          disabled={disableButton}
          onClick={handleReduce}
          size="sm"
          variant="filled"
          className="bg-gray-400"
        >
          <AiOutlineMinus className="h-4 w-4" />
        </Button>
        <p className="font-bold">{totalWeight}</p>
        <Button
          onClick={handleAdd}
          size="sm"
          variant="filled"
          className="bg-bs-primary"
        >
          <AiOutlinePlus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartQuantityItemCounter;