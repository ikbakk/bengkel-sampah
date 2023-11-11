"use client";

import CartQuantityItemCounter from "@/components/molecules/CartQuantityItemCounter";
import { CartContext } from "@/context/CartContext";
import { Typography, Card, CardBody, Checkbox } from "@material-tailwind/react";

import { useContext } from "react";

const CartItem = ({
  cartItemID,
  wasteID,
  price,
  pricePerUnit,
  wasteName,
  unit,
  selected,
}) => {
  const { selectCartItem, cartQuery, updateCartItemWeight } =
    useContext(CartContext);
  const { data: cart } = cartQuery;
  const findCartById = cart?.cartItems?.find(
    (cartItem) => cartItem.cartItemID === cartItemID,
  );

  const handleWeightChange = (modifier) => {
    updateCartItemWeight.mutate({
      cartItemID,
      newWeight: findCartById.weight + modifier,
    });
  };

  return (
    <div className="flex w-full items-center gap-4">
      <Checkbox
        color="red"
        checked={selected}
        onChange={() => selectCartItem.mutate(wasteID)}
      />
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
              handleChange={handleWeightChange}
              totalWeight={findCartById.weight}
              loading={updateCartItemWeight.isPending}
            />
          </section>
        </CardBody>
      </Card>
    </div>
  );
};

export default CartItem;
