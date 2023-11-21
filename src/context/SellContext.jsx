"use client";

import { createContext, useState } from "react";

export const SellContext = createContext(null);

export const SellProvider = ({ children }) => {
  const [cartID, setCartID] = useState("");
  const [method, setMethod] = useState("cash");

  const dateIso = new Date().toISOString();

  const [transactionBody, setTransactionBody] = useState({
    source: "PARTNER",
    userID: "",
    partnerID: "",
    wastes: [],
    transactionDate: dateIso,
    address: "",
  });

  const value = {
    cartID,
    setCartID,
    method,
    setMethod,
    transactionBody,
    setTransactionBody,
  };

  return <SellContext.Provider value={value}>{children}</SellContext.Provider>;
};
