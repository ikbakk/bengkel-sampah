import React from "react";

const CartQuantityItem = ({ pricePerUnit, price, unit }) => {
  return (
    <div className="flex items-center gap-2">
      <p className="text-md font-bold text-[#519B37] md:text-xl">Rp {price}</p>
      <p>|</p>
      <p>
        @{pricePerUnit}/{unit}
      </p>
    </div>
  );
};

export default CartQuantityItem;
