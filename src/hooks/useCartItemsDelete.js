import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

function useCartItemsDelete(cartID) {
  const [loading, setLoading] = useState(false);
  const {
    cartItems,
    setCartItems,
    setCartTotal,
    selectedCartItems,
    setSelectedCartItems,
  } = useContext(CartContext);

  const handleDelete = async () => {
    try {
      const updatedCartItems = cartItems.filter(
        (item) => !selectedCartItems.includes(item.waste.wasteID),
      );

      const newPrice = updatedCartItems
        .map((item) => item.weight * item.waste.price)
        .reduce((acc, item) => acc + item, 0);
      const newWeight = updatedCartItems
        .map((item) => item.weight)
        .reduce((acc, item) => acc + item, 0);
      setLoading(true);
      setCartItems(updatedCartItems);
      setCartTotal({
        totalPrice: newPrice,
        totalWeight: newWeight,
      });

      await axios
        .delete(`${baseURL}/api/cart/${cartID}/items`, {
          data: {
            wasteIDs: selectedCartItems,
          },
        })
        .then(() => setLoading(false));
      setSelectedCartItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleDelete, loading };
}

export default useCartItemsDelete;
