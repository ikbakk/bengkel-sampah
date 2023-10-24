"use client";

import ContentHeader from "@/components/atoms/ContentHeader";
import CartHeaderTitle from "@/components/atoms/CartHeaderItem/Title";
import PriceCard from "@/components/atoms/CartHeaderItem/PriceCard";

import { convertToIDR } from "@/lib/convertToIDR";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const CartHeader = () => {
  const { cartTotal } = useContext(CartContext);
  return (
    <ContentHeader>
      <CartHeaderTitle title="Total Estimasi :" />
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-8">
        <PriceCard
          title="Estimasi Harga"
          value={convertToIDR(cartTotal.totalPrice)}
        />
        <PriceCard
          title="Estimasi Berat"
          value={`${cartTotal.totalWeight} kg`}
        />
      </div>
    </ContentHeader>
  );
};

export default CartHeader;
