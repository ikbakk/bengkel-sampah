"use client";

import { TbWeight } from "react-icons/tb";
import { CiMoneyBill } from "react-icons/ci";
import { Card, CardBody } from "@material-tailwind/react";
import ContentHeader from "@/components/atoms/ContentHeader";
import PriceCard from "@/components/atoms/CartHeaderItem/PriceCard";
import CartHeaderTitle from "@/components/atoms/CartHeaderItem/Title";

import { useContext } from "react";
import { convertToIDR } from "@/lib/convertToIDR";
import { CartContext } from "@/context/CartContext";

const CartHeader = () => {
  const { cartQuery } = useContext(CartContext);
  const { data: cart } = cartQuery;

  return (
    <ContentHeader>
      <Card>
        <CardBody>
          <CartHeaderTitle title="Estimasi Penjualan" />
          <div className="flex flex-row items-center gap-4">
            <PriceCard
              title="Berat"
              icon={<TbWeight className="text-bs-secondary" size={24} />}
              value={`${cart?.totalWeight} kg`}
            />
            <PriceCard
              title="Harga"
              icon={<CiMoneyBill className="text-bs-secondary" size={24} />}
              value={convertToIDR(cart?.totalPrice)}
            />
          </div>
        </CardBody>
      </Card>
    </ContentHeader>
  );
};

export default CartHeader;
