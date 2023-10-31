"use client";

import { createContext, useState } from "react";

export const SellContext = createContext(null);

export const SellProvider = ({ children }) => {
  const dateNow = new Date();
  const [date, setDate] = useState({
    startDate: dateNow.toLocaleDateString("id"),
    endDate: null,
  });
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState("cash");
  const [cartTotal, setCartTotal] = useState({
    totalPrice: 0,
    totalWeight: 0,
  });

  const value = {
    date,
    setDate,
    address,
    setAddress,
    cartTotal,
    setCartTotal,
    method,
    setMethod,
  };

  return <SellContext.Provider value={value}>{children}</SellContext.Provider>;
};
