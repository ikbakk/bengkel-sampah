import ContentHeader from "@/components/atoms/ContentHeader";
import CartHeaderTitle from "@/components/atoms/CartHeaderItem/Title";
import PriceCard from "@/components/atoms/CartHeaderItem/PriceCard";
const CartHeader = () => {
  return (
    <ContentHeader>
      <CartHeaderTitle title="Total Estimasi :" />
      <div className="flex flex-col items-center justify-center md:flex-row md:gap-8">
        <PriceCard title="Estimasi Harga" value="Rp 100.000" />
        <PriceCard title="Estimasi Berat" value="Rp 100.000" />
      </div>
    </ContentHeader>
  );
};

export default CartHeader;
