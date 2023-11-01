"use client";

import { createContext, useState } from "react";

export const SellContext = createContext(null);

export const SellProvider = ({ children }) => {
  const [cartID, setCartID] = useState("");
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState("cash");

  const dateIso = new Date().toISOString();

  const [transactionBody, setTransactionBody] = useState({
    source: "PARTNER",
    userID: "",
    partnerID: "",
    wastes: [],
    transactionDate: dateIso,
  });

  const value = {
    cartID,
    setCartID,
    address,
    setAddress,
    method,
    setMethod,
    transactionBody,
    setTransactionBody,
  };

  return <SellContext.Provider value={value}>{children}</SellContext.Provider>;
};
