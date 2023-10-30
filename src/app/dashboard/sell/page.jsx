import Sell from "@/components/templates/Sell";
import { NavTop } from "@/components/molecules/NavTop";
import { SellProvider } from "@/context/SellContext";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import axios from "axios";

export const revalidate = "1s";

const baseUrl = process.env.BASEURL;

export default async function SellPage() {
  const { user } = await getServerSession(authOptions);
  const { data: cart } = await axios.get(`${baseUrl}/api/cart`, {
    params: { userID: user.id },
  });

  return (
    <SellProvider>
      <NavTop label="Jual Sampah" />
      <Sell cart={cart.data} />
    </SellProvider>
  );
}
