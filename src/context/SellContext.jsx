"use client";

import { createContext, useState } from "react";

export const SellContext = createContext(null);

export const SellProvider = ({ children }) => {
  const value = {};

  return <SellContext.Provider value={value}>{children}</SellContext.Provider>;
};
