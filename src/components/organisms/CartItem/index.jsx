"use client";

import { Typography, Card, CardBody, Checkbox } from "@material-tailwind/react";
import CartQuantityItemCounter from "@/components/molecules/CartQuantityItemCounter";
import useCartActions from "@/hooks/useCartActions";

const CartItem = ({
  cartID,
  wasteID,
  price,
  pricePerUnit,
  wasteName,
  unit,
  totalWeight,
  onSelect,
  selected,
}) => {
  const hooksParams = {
    wasteID,
    pricePerUnit,
    cartID,
  };

  const { handleAdd, handleReduce } = useCartActions(hooksParams);

  const handleChange = () => {
    onSelect(wasteID);
  };

  return (
    <div className="flex w-full items-center gap-4">
      <Checkbox color="red" checked={selected} onChange={handleChange} />
      <Card className="w-full">
        <CardBody>
          <Typography variant="h5" className="text-md capitalize md:text-xl">
            {wasteName}
          </Typography>
          <section className="flex flex-col items-center justify-between gap-2 md:flex-row md:items-end">
            <div className="flex w-full items-center justify-start gap-2">
              <p className="text-md font-bold text-[#519B37] md:text-xl">
                {price}{" "}
                <span className="text-sm font-normal text-bs-font_primary">
                  | @{pricePerUnit}/{unit}
                </span>
              </p>
            </div>
            <CartQuantityItemCounter
              handleAdd={handleAdd}
              handleReduce={handleReduce}
              totalWeight={totalWeight}
              unit={unit}
            />
          </section>
        </CardBody>
      </Card>
    </div>
  );
};

export default CartItem;
