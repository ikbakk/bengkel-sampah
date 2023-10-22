"use client";

import CartHeader from "@/components/molecules/CartHeader";
import CartItem from "@/components/organisms/CartItem";
import NewCartItem from "@/components/organisms/NewCartItem";
import { CartProvider } from "@/context/CartContext";

const Cart = () => {
  return (
    <CartProvider>
      <div className="flex h-screen w-full flex-col gap-4">
        <CartHeader />
        <div className="flex w-full flex-col-reverse gap-4 md:flex-row">
          <div className="md:w-[70%]">
            <CartItem
              totalWeight={2}
              unit={"kg"}
              wasteName="plastik"
              price={2000}
              pricePerUnit={5000}
            />
          </div>
          <div className="md:w-[30%]">
            <NewCartItem />
          </div>
        </div>
      </div>
    </CartProvider>
  );
};

export default Cart;
