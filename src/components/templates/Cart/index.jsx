"use client";

import CartHeader from "@/components/molecules/CartHeader";
import CartItem from "@/components/organisms/CartItem";
import NewCartItem from "@/components/organisms/NewCartItem";
import CartSelectAll from "@/components/molecules/CartSelectAll";

import { convertToIDR } from "@/lib/convertToIDR";
import { CartContext } from "@/context/CartContext";
import { useContext, useEffect, useState } from "react";

const Cart = ({ wastes }) => {
  const { cartQuery, selectedCartItems } = useContext(CartContext);
  const { data: cart } = cartQuery;
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if (selectedCartItems.length > 0) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  }, [selectedCartItems]);

  const hideButton = isHidden ? "hidden" : "";

  return (
    <div className="pb-8">
      <CartHeader />
      <div className="mt-4 flex w-full flex-col-reverse gap-4 lg:flex-row">
        <div className="flex flex-col gap-4 lg:w-[70%]">
          <CartSelectAll
            className={`${hideButton} flex w-full items-center justify-between gap-4`}
          />
          <div className="flex flex-col gap-2 ">
            {cart?.cartItems?.map((item) => {
              return (
                <CartItem
                  key={item?.cartItemID}
                  cartItemID={item?.cartItemID}
                  unit={item?.waste?.unit}
                  wasteID={item?.waste?.wasteID}
                  wasteName={item?.waste?.name}
                  price={convertToIDR(item?.price)}
                  pricePerUnit={item?.waste?.price}
                  selected={selectedCartItems.includes(item?.waste.wasteID)}
                />
              );
            })}
          </div>
        </div>
        <div className="lg:w-[30%]">
          <NewCartItem cartID={cart?.cartID} wastes={wastes ?? []} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
