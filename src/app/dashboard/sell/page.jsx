import Sell from "@/components/templates/Sell";
import { SellProvider } from "@/context/SellContext";
import { NavTop } from "@/components/molecules/NavTop";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { fetchItemsWithParams } from "@/utils/fetchItems";

export default async function SellPage() {
  const { user } = await getServerSession(authOptions);
  const params = {
    userID: user.id,
  };
  const cart = await fetchItemsWithParams("/api/cart", params);

  return (
    <SellProvider>
      <NavTop label="Jual Sampah" />
      <Sell cart={cart.data} />
    </SellProvider>
  );
}