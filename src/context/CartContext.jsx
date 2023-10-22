"use client";

import { createContext, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [newCartItem, setNewCartItem] = useState({});

  const value = {
    cartItems,
    setCartItems,
    newCartItem,
    setNewCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
