"use client";

import CartHeader from "@/components/molecules/CartHeader";
import CartItem from "@/components/organisms/CartItem";
import NewCartItem from "@/components/organisms/NewCartItem";
import { useContext, useEffect } from "react";
import { CartContext } from "@/context/CartContext";
import { convertToIDR } from "@/lib/convertToIDR";

const Cart = ({
  wastes,
  fetchedCartItems,
  cartID,
  totalPrice,
  totalWeight,
}) => {
  const { cartItems, setCartItems, setCartTotal } = useContext(CartContext);

  useEffect(() => {
    setCartItems(fetchedCartItems);
    setCartTotal({
      totalPrice,
      totalWeight,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <CartHeader />
      <div className="mt-4 flex w-full flex-col-reverse gap-4 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[70%]">
          {cartItems?.map((item) => {
            return (
              <CartItem
                key={item?.cartItemID}
                totalWeight={item?.weight}
                unit={item?.waste?.unit}
                cartID={cartID}
                wasteID={item?.waste?.wasteID}
                wasteName={item?.waste?.name}
                price={convertToIDR(item?.price)}
                pricePerUnit={item?.waste?.price}
              />
            );
          })}
        </div>
        <div className="lg:w-[30%]">
          <NewCartItem cartID={cartID} wastes={wastes} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
