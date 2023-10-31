"use client";

import { TbWeight } from "react-icons/tb";
import { CiMoneyBill } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CardBody } from "@material-tailwind/react";
import PriceCard from "@/components/atoms/CartHeaderItem/PriceCard";
import CartHeaderTitle from "@/components/atoms/CartHeaderItem/Title";

import { convertToIDR } from "@/lib/convertToIDR";
import Link from "next/link";

const SellEstimations = ({ totalPrice, totalWeight }) => {
  return (
    <CardBody>
      <CartHeaderTitle title="Estimasi Harga & Berat" />
      <div className="flex w-full flex-row items-center justify-around gap-4 rounded-lg p-4 outline outline-bs-secondary duration-100 ">
        <PriceCard
          width="w-fit"
          title="Berat"
          icon={<TbWeight className="text-bs-secondary" size={24} />}
          value={`${totalWeight} kg`}
        />
        <PriceCard
          width="w-fit"
          title="Harga"
          icon={<CiMoneyBill className="text-bs-secondary" size={24} />}
          value={convertToIDR(totalPrice)}
        />
        <Link
          href="/dashboard/cart"
          className="rounded-full bg-bs-primary p-3 text-white duration-100 hover:shadow-md active:scale-95"
        >
          <AiOutlineShoppingCart size={32} />
        </Link>
      </div>
    </CardBody>
  );
};

export default SellEstimations;
