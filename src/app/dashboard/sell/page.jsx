import Sell from "@/components/templates/Sell";
import { NavTop } from "@/components/molecules/NavTop";
import { SellContext, SellProvider } from "@/context/SellContext";

export default async function SellPage() {
  return (
    <SellProvider>
      <NavTop label="Jual Sampah" />
      <Sell />
    </SellProvider>
  );
}
