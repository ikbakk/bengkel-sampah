import React from "react";
import SellHeader from "@/components/molecules/SellHeader";
import SellForm from "@/components/organisms/SellForm";

const Sell = () => {
  return (
    <div>
      <SellHeader
        address="Jl. TB Simatupang No.Kav38, RW.8, Jati Padang, Kec. Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12540."
        distance={10}
        name="BS AGEN PASAR MINGGU"
        phoneNumber="089675234567"
        bgImage="/assets/images/dummy.png"
      />
      <div>
        <SellForm />
      </div>
    </div>
  );
};

export default Sell;
