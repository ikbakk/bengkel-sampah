import { NavTop } from "@/components/molecules/NavTop";
import { CartProvider } from "@/context/CartContext";
import Cart from "@/components/templates/Cart";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchItems, fetchItemsWithOptions } from "@/utils/fetchItems";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const { user } = await getServerSession(authOptions);
  const fetchOpts = {
    params: {
      userID: user.id,
    },
    headers: {
      Authorization: user.accessToken,
    },
  };

  const wastes = await fetchItems("/api/waste", user.accessToken);
  const cart = await fetchItemsWithOptions("/api/cart", fetchOpts);

  return (
    <CartProvider>
      <NavTop label="Keranjang Sampah" />
      <Cart
        wastes={wastes.data}
        cartID={cart.data.cartID}
        totalPrice={cart.data.totalPrice}
        totalWeight={cart.data.totalWeight}
        fetchedCartItems={cart.data.cartItems ?? []}
      />
    </CartProvider>
  );
}
