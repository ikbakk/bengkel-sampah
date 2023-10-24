"use client";

import { Typography, Card, CardBody } from "@material-tailwind/react";
import CartQuantityItemCounter from "@/components/molecules/CartQuantityItemCounter";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

const CartItem = ({
  cartID,
  wasteID,
  price,
  pricePerUnit,
  wasteName,
  unit,
  totalWeight,
}) => {
  const { cartItems, setCartItems, setCartTotal } = useContext(CartContext);
  const cartItem = cartItems.find((item) => item?.waste?.wasteID === wasteID);

  const handleAdd = async () => {
    try {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) => {
          if (item.waste.wasteID === wasteID) {
            return {
              ...item,
              weight: item.weight + 1,
              price: item.price + item.waste.price,
            };
          }

          return item;
        }),
      );

      setCartTotal((prevCartTotal) => ({
        totalPrice: prevCartTotal.totalPrice + pricePerUnit,
        totalWeight: prevCartTotal.totalWeight + 1,
      }));

      await axios.put(
        `${baseURL}/api/cart/${cartID}/items/${cartItem.cartItemID}`,
        {
          newWeight: cartItem.weight + 1,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleReduce = async () => {
    try {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) => {
          if (item.waste.wasteID === wasteID) {
            return {
              ...item,
              weight: item.weight - 1,
              price: item.price - item.waste.price,
            };
          }

          return item;
        }),
      );

      setCartTotal((prevCartTotal) => ({
        totalPrice: prevCartTotal.totalPrice - pricePerUnit,
        totalWeight: prevCartTotal.totalWeight - 1,
      }));

      await axios.put(
        `${baseURL}/api/cart/${cartID}/items/${cartItem.cartItemID}`,
        {
          newWeight: cartItem.weight - 1,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardBody>
        <Typography variant="h5" className="text-md capitalize md:text-xl">
          {wasteName}
        </Typography>
        <section className="flex flex-col items-center justify-between gap-2 md:flex-row md:items-end">
          <div className="flex w-full items-center justify-start gap-2">
            <p className="text-md font-bold text-[#519B37] md:text-xl">
              {price}
            </p>
            <p>|</p>
            <p>
              @{pricePerUnit}/{unit}
            </p>
          </div>
          <CartQuantityItemCounter
            handleAdd={handleAdd}
            handleReduce={handleReduce}
            totalWeight={totalWeight}
            unit={unit}
          />
        </section>
      </CardBody>
    </Card>
  );
};

export default CartItem;
