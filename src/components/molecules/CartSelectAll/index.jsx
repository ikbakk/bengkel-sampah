"use client";

import { Button, Checkbox, Spinner } from "@material-tailwind/react";

import { useState, useContext } from "react";
import { CartContext } from "@/context/CartContext";
import sameElementCheck from "@/lib/sameElementCheck";

const CartSelectAll = ({ ...props }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { cartQuery, deleteCartItems, selectAllCartItems, selectedCartItems } =
    useContext(CartContext);
  const { data: cart } = cartQuery;
  const wasteIDs = cart?.cartItems.map((item) => item.waste.wasteID) ?? [];

  const elementCheck = sameElementCheck(wasteIDs, selectedCartItems);

  const handleChange = () => {
    selectAllCartItems.mutate(isChecked);
    setIsChecked((prev) => !prev);
  };

  return (
    <div {...props}>
      <div className="flex items-center hover:cursor-pointer">
        <Checkbox onChange={handleChange} checked={elementCheck} color="red" />
        <p className="text-bs-font_primary">Pilih Semua</p>
      </div>
      <Button
        onClick={() => deleteCartItems.mutate()}
        color="red"
        className="px-12"
      >
        {deleteCartItems.isPending ? (
          <Spinner className="flex h-4 w-4 self-center" />
        ) : (
          "Hapus"
        )}
      </Button>
    </div>
  );
};

export default CartSelectAll;
