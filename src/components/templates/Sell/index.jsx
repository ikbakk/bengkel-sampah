"use client";

import SellHeader from "@/components/molecules/SellHeader";
import SellForm from "@/components/organisms/SellForm";
import SellConfirm from "@/components/organisms/SellConfirm";
import { useContext, useEffect, useState } from "react";
import { SellContext } from "@/context/SellContext";

const Sell = ({ cart, partners, userID }) => {
  const [loading, setLoading] = useState(true);
  const { totalPrice, totalWeight, cartID } = cart;
  const { transactionBody, setTransactionBody, setCartID } =
    useContext(SellContext);
  const cartItems = cart.cartItems.map((item) => {
    return {
      wasteID: item.waste.wasteID,
      totalWeight: item.weight,
    };
  });

  const partnerDetails = partners.find(
    (partner) => partner.userID === transactionBody.partnerID,
  );

  useEffect(() => {
    if (!partnerDetails) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [partnerDetails]);

  useEffect(() => {
    setTransactionBody({
      ...transactionBody,
      userID,
      wastes: cartItems,
    });
    setCartID(cartID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <SellHeader
        loading={loading}
        address={partnerDetails?.address ?? ""}
        distance={10}
        name={partnerDetails?.name ?? ""}
        phoneNumber={partnerDetails?.phoneNumber ?? ""}
        bgImage="/assets/images/dummy.png"
      />
      <div className="mt-4 flex flex-col justify-between gap-2 lg:mt-20 lg:flex-row-reverse lg:gap-4">
        <SellConfirm totalPrice={totalPrice} totalWeight={totalWeight} />
        <SellForm partners={partners} />
      </div>
    </div>
  );
};

export default Sell;
