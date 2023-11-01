"use client";

import CartHeader from "@/components/molecules/CartHeader";
import CartItem from "@/components/organisms/CartItem";
import NewCartItem from "@/components/organisms/NewCartItem";
import CartSelectAll from "@/components/molecules/CartSelectAll";

import { convertToIDR } from "@/lib/convertToIDR";
import { Spinner } from "@material-tailwind/react";
import { CartContext } from "@/context/CartContext";
import { useContext, useEffect, useState } from "react";

const Cart = ({
  wastes,
  fetchedCartItems,
  cartID,
  totalPrice,
  totalWeight,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const {
    cartItems,
    setCartItems,
    setCartTotal,
    selectedCartItems,
    setSelectedCartItems,
  } = useContext(CartContext);

  const handleItemSelect = (wasteID) => {
    if (selectedCartItems.includes(wasteID)) {
      setSelectedCartItems(selectedCartItems.filter((id) => id !== wasteID));
    } else {
      setSelectedCartItems([...selectedCartItems, wasteID]);
    }
  };

  const handleSelectAll = (isChecked) => {
    const newSelectedItems = isChecked
      ? []
      : cartItems.map((item) => item.waste.wasteID);
    setSelectedCartItems(newSelectedItems);
  };

  useEffect(() => {
    if (selectedCartItems.length > 0) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  }, [selectedCartItems]);

  useEffect(() => {
    setCartItems(fetchedCartItems);
    setCartTotal({
      totalPrice,
      totalWeight,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hideButton = isHidden ? "hidden" : "";

  return (
    <div className="pb-8">
      <CartHeader />
      <div className="mt-4 flex w-full flex-col-reverse gap-4 lg:flex-row">
        <div className="flex flex-col gap-4 lg:w-[70%]">
          <CartSelectAll
            cartID={cartID}
            onChange={handleSelectAll}
            hideButton={hideButton}
          />
          <div className="flex flex-col gap-2 ">
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
                  onSelect={handleItemSelect}
                  selected={selectedCartItems.includes(item?.waste.wasteID)}
                />
              );
            })}
          </div>
        </div>
        <div className="lg:w-[30%]">
          <NewCartItem cartID={cartID} wastes={wastes} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
