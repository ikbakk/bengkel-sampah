import SellHeader from "@/components/molecules/SellHeader";
import SellForm from "@/components/organisms/SellForm";
import SellConfirm from "@/components/organisms/SellConfirm";

const Sell = ({ cart }) => {
  const { totalPrice, totalWeight } = cart;
  return (
    <div className="">
      <SellHeader
        address="Jl. TB Simatupang No.Kav38, RW.8, Jati Padang, Kec. Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12540."
        distance={10}
        name="BS AGEN PASAR MINGGU"
        phoneNumber="089675234567"
        bgImage="/assets/images/dummy.png"
      />
      <div className="mt-4 flex flex-col justify-between gap-2 lg:mt-20 lg:flex-row-reverse lg:gap-4">
        <SellConfirm totalPrice={totalPrice} totalWeight={totalWeight} />
        <SellForm />
      </div>
    </div>
  );
};

export default Sell;
