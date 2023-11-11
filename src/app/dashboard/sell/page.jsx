import Sell from "@/components/templates/Sell";
import { SellProvider } from "@/context/SellContext";
import { NavTop } from "@/components/molecules/NavTop";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { fetchItemsWithOptions, fetchItems } from "@/utils/fetchItems";

export default async function SellPage() {
  const { user } = await getServerSession(authOptions);
  const fetchOpts = {
    params: {
      userID: user.id,
    },
    headers: {
      Authorization: user.accessToken,
    },
  };
  const cart = await fetchItemsWithOptions("/api/cart", fetchOpts);
  const partners = await fetchItems("/api/partner", user.accessToken);

  return (
    <SellProvider>
      <NavTop label="Jual Sampah" />
      <Sell cart={cart.data} userID={user.id} partners={partners.data} />
    </SellProvider>
  );
}
