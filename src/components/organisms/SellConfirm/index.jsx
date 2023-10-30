"use client";

import { Card } from "@material-tailwind/react";
import SellMethods from "@/components/molecules/SellMethods";
import SellEstimations from "@/components/molecules/SellEstimations";

const SellConfirm = ({ totalPrice, totalWeight }) => {
  return (
    <Card className=" w-full shadow-none">
      <SellEstimations totalPrice={totalPrice} totalWeight={totalWeight} />
      <SellMethods />
    </Card>
  );
};

export default SellConfirm;
