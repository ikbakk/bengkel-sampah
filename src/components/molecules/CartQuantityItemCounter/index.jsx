"use client";

import { Button, Typography, Spinner } from "@material-tailwind/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const CartQuantityItemCounter = ({ totalWeight, handleChange, loading }) => {
  const disableButton =
    (totalWeight <= 0 ? true : false) || (loading ? true : false);
  return (
    <div>
      <Typography className="text-center">Estimasi Berat</Typography>
      <div className="flex items-center justify-center gap-4">
        <Button
          disabled={disableButton}
          onClick={() => handleChange(-1)}
          size="sm"
          variant="filled"
          className="bg-gray-400"
        >
          {loading ? (
            <Spinner className="h-4 w-4" />
          ) : (
            <AiOutlineMinus className="h-4 w-4" />
          )}
        </Button>
        <p className="font-bold">{totalWeight}</p>
        <Button
          onClick={() => handleChange(1)}
          size="sm"
          variant="filled"
          className="bg-bs-primary"
        >
          {loading ? (
            <Spinner className="h-4 w-4" />
          ) : (
            <AiOutlinePlus className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CartQuantityItemCounter;
