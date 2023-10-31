"use client";

import ContentHeader from "@/components/atoms/ContentHeader";
import CartHeaderTitle from "@/components/atoms/CartHeaderItem/Title";
import PriceCard from "@/components/atoms/CartHeaderItem/PriceCard";

import { convertToIDR } from "@/lib/convertToIDR";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { Card, CardBody } from "@material-tailwind/react";
import { CiMoneyBill } from "react-icons/ci";
import { TbWeight } from "react-icons/tb";

const CartHeader = () => {
  const { cartTotal } = useContext(CartContext);
  return (
    <ContentHeader>
      <Card>
        <CardBody>
          <CartHeaderTitle title="Estimasi Penjualan" />
          <div className="flex flex-row items-center gap-4">
            <PriceCard
              title="Berat"
              icon={<TbWeight className="text-bs-secondary" size={24} />}
              value={`${cartTotal.totalWeight} kg`}
            />
            <PriceCard
              title="Harga"
              icon={<CiMoneyBill className="text-bs-secondary" size={24} />}
              value={convertToIDR(cartTotal.totalPrice)}
            />
          </div>
        </CardBody>
      </Card>
    </ContentHeader>
  );
};

export default CartHeader;
