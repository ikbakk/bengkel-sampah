import { NavTop } from "@/components/molecules/NavTop";
import Cart from "@/components/templates/Cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import axios from "axios";

export const revalidate = "1s";

const baseURL = process.env.BASEURL;

export default async function CartPage() {
  const { user } = await getServerSession(authOptions);

  const { data: wastes } = await axios.get(`${baseURL}/api/waste`);
  const { data: cart } = await axios.get(`${baseURL}/api/cart`, {
    params: { userID: user.id },
  });

  return (
    <>
      <NavTop label="Keranjang Sampah" />
      <Cart
        wastes={wastes.data}
        cartID={cart.data.cartID}
        totalPrice={cart.data.totalPrice}
        totalWeight={cart.data.totalWeight}
        fetchedCartItems={cart.data.cartItems}
      />
    </>
  );
}
