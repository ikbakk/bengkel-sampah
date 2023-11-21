"use client";

import { getItemsWithOptions } from "@/utils/queryFn/getItemsWithOptions";
import { deleteItems, updateItem, addItem } from "@/utils/queryFn/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children, initialCart, token, userID }) => {
  const queryClient = useQueryClient();
  const fetchOptions = {
    params: {
      userID,
    },
    headers: {
      Authorization: token,
    },
  };

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: async () => await getItemsWithOptions("/cart", fetchOptions),
    staleTime: 0,
    initialData: initialCart,
  });

  const { data: selectedCartItems } = useQuery({
    queryKey: ["selectedCartItems"],
    initialData: [],
  });

  const addCartItem = useMutation({
    mutationFn: ({ wasteID, weight }) =>
      addItem(
        `/api/cart/${cartQuery.data.cartID}/items`,
        {
          wasteID,
          weight,
        },
        token,
      ),
    onSuccess: () => {
      cartQuery.refetch();
    },
  });

  const deleteCartItems = useMutation({
    mutationFn: () =>
      deleteItems(`/api/cart/${cartQuery.data.cartID}/items`, {
        data: {
          wasteIDs: selectedCartItems,
        },
        headers: {
          Authorization: token,
        },
      }),
    onSuccess: () => {
      queryClient.setQueryData(["selectedCartItems"], []);
      cartQuery.refetch();
    },
  });

  const updateCartItemWeight = useMutation({
    mutationFn: ({ cartItemID, newWeight }) =>
      updateItem(
        `/api/cart/${cartQuery.data.cartID}/items/${cartItemID}`,
        { newWeight },
        token,
      ),
    onSuccess: () => {
      cartQuery.refetch();
    },
  });

  const selectAllCartItems = useMutation({
    mutationFn: (isChecked) => {
      const newSelectedItems = isChecked
        ? []
        : cart.cartItems.map((item) => item.waste.wasteID);
      return newSelectedItems;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["selectedCartItems"], data);
    },
  });

  const selectCartItem = useMutation({
    mutationFn: (wasteID) => {
      if (selectedCartItems.includes(wasteID)) {
        return selectedCartItems.filter((id) => id !== wasteID);
      } else {
        return [...selectedCartItems, wasteID];
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["selectedCartItems"], data);
    },
  });

  const value = {
    initialCart,
    token,
    cartQuery,
    deleteCartItems,
    selectCartItem,
    selectAllCartItems,
    selectedCartItems,
    updateCartItemWeight,
    addCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
