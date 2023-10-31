import { useContext } from "react";
import axios from "axios";
import { CartContext } from "@/context/CartContext";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

function useCartItemsDelete(cartID) {
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

      setCartItems(updatedCartItems);
      setCartTotal({
        totalPrice: newPrice,
        totalWeight: newWeight,
      });

      await axios.delete(`${baseURL}/api/cart/${cartID}/items`, {
        data: {
          wasteIDs: selectedCartItems,
        },
      });
      setSelectedCartItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleDelete };
}

export default useCartItemsDelete;
