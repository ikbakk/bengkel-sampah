"use client";

import { Typography, Card, CardBody } from "@material-tailwind/react";
import CartQuantityItemCounter from "@/components/atoms/CartQuantityItemCounter";
import CartQuantityItem from "@/components/atoms/CartQuantityItem";

const CartItem = ({ price, pricePerUnit, wasteName, unit, totalWeight }) => {
  return (
    <Card>
      <CardBody>
        <Typography variant="h5" className="text-md capitalize md:text-xl">
          {wasteName}
        </Typography>
        <div className="flex items-end justify-between">
          <CartQuantityItem
            unit={unit}
            price={price}
            pricePerUnit={pricePerUnit}
          />
          <CartQuantityItemCounter totalWeight={totalWeight} unit={unit} />
        </div>
      </CardBody>
    </Card>
  );
};

export default CartItem;
