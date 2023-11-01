import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

function useCartAddItem(wastes, cartID) {
  const { setCartItems, setCartTotal } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [newCartItem, setNewCartItem] = useState({
    wasteID: "",
    totalWeight: 0,
  });

  const selectedWaste = wastes.find(
    (waste) => waste.wasteID === newCartItem.wasteID,
  );
  const pricePerUnit = selectedWaste ? selectedWaste.price : 0;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios
        .post(`${baseURL}/api/cart/${cartID}/items`, {
          wasteID: newCartItem.wasteID,
          weight: newCartItem.totalWeight,
        })
        .then((data) => {
          setLoading(false);
          return data;
        });

      setCartTotal((prevCartTotal) => ({
        totalPrice:
          prevCartTotal.totalPrice + newCartItem.totalWeight * pricePerUnit,
        totalWeight: prevCartTotal.totalWeight + newCartItem.totalWeight,
      }));

      setCartItems((prevCartItems) => [...prevCartItems, data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setNewCartItem({
      ...newCartItem,
      wasteID: e,
    });
  };

  const handleAdd = () => {
    setNewCartItem((prev) => ({
      ...prev,
      totalWeight: prev.totalWeight + 1,
    }));
  };

  const handleReduce = () => {
    setNewCartItem((prev) => ({
      ...prev,
      totalWeight: prev.totalWeight - 1,
    }));
  };

  return {
    handleAdd,
    handleReduce,
    handleChange,
    handleSubmit,
    loading,
    newCartItem,
  };
}

export default useCartAddItem;
