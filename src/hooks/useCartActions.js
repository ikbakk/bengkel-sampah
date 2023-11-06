import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

function useCartActions({ wasteID, pricePerUnit, cartID }) {
  const router = useRouter();
  const { cartItems, setCartItems, setCartTotal } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const cartItem = cartItems.find((item) => item?.waste?.wasteID === wasteID);

  const updateCartItem = async (newWeight) => {
    try {
      setLoading(true);
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) => {
          if (item.waste.wasteID === wasteID) {
            return {
              ...item,
              weight: item.weight + newWeight,
              price: item.price + newWeight * item.waste.price,
            };
          }
          return item;
        }),
      );

      setCartTotal((prevCartTotal) => ({
        totalPrice: prevCartTotal.totalPrice + newWeight * pricePerUnit,
        totalWeight: prevCartTotal.totalWeight + newWeight,
      }));

      await axios
        .put(`${baseURL}/api/cart/${cartID}/items/${cartItem.cartItemID}`, {
          newWeight: cartItem.weight + newWeight,
        })
        .then(() => {
          setLoading(false);
          router.refresh();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    updateCartItem(1);
  };

  const handleReduce = async () => {
    updateCartItem(-1);
  };

  return { handleAdd, handleReduce, loading };
}

export default useCartActions;
