"use client";

import { createContext, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [newCartItem, setNewCartItem] = useState({
    wasteID: "",
    totalWeight: 0,
  });

  const [cartTotal, setCartTotal] = useState({
    totalPrice: 0,
    totalWeight: 0,
  });

  const value = {
    cartItems,
    setCartItems,
    newCartItem,
    setNewCartItem,
    cartTotal,
    setCartTotal,
    selectedCartItems,
    setSelectedCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
