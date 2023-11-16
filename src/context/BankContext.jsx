"use client";
import { addItem, deleteItem, deleteItems } from "../utils/queryFn/bank";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, createContext } from "react";
import { getItemsWithOptions } from "@/utils/queryFn/getItemsWithOptions";

export const BankContext = createContext(null);

export const BankProvider = ({ children, initialBank, token }) => {
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const queryClient = useQueryClient();
  const fetchOptions = {
    headers: {
      Authorization: token,
    },
  };

  const bankQuery = useQuery({
    queryKey: ["bank"],
    queryFn: async () => await getItemsWithOptions("bank", fetchOptions),
    initialData: initialBank,
  });

  const { data: selectedBankItems } = useQuery({
    queryKey: ["selectedBankItems"],
    initialData: [],
  });

  const addBankItem = useMutation({
    mutationFn: ({ name, address }) =>
      addItem(
        `bank`,
        {
          name,
          address,
        },
        token,
      ),
    onSuccess: () => {
      bankQuery.refetch();
    },
  });

  const deleteBankItem = useMutation({
    mutationFn: (wasteBankID) =>
      deleteItem(`bank`, wasteBankID, {
        headers: {
          Authorization: token,
        },
      }),
    onSuccess: () => {
      queryClient.setQueryData(["selectedBankItems"], []);
      bankQuery.refetch();
    },
  });

  const deleteBankItems = useMutation({
    mutationFn: () =>
      deleteItems("bank", {
        data: {
          bankIDs: selectedBankItems,
        },
        headers: {
          Authorization: token,
        },
      }),
    onSuccess: () => {
      queryClient.setQueryData(["selectedBankItems"], []);
      bankQuery.refetch();
    },
  });

  const selectAllBankItems = useMutation({
    mutationFn: (isChecked) => {
      if (isChecked) {
        queryClient.setQueryData(
          ["selectedBankItems"],
          bankQuery.data.map((data) => data.wasteBankID),
        );
        setIsSelectedAll(true);
      } else {
        queryClient.setQueryData(["selectedBankItems"], []);
        setIsSelectedAll(false);
      }
    },
  });

  const selectBankItem = useMutation({
    mutationFn: (wasteBankID) => {
      if (isSelectedAll) setIsSelectedAll(false);

      if (selectedBankItems.includes(wasteBankID)) {
        queryClient.setQueryData(
          ["selectedBankItems"],
          selectedBankItems.filter((id) => id !== wasteBankID),
        );
      } else {
        queryClient.setQueryData(["selectedBankItems"], [wasteBankID]);
        setIsSelectedAll(false);
      }
    },
  });

  const isLoaded = bankQuery.isSuccess && bankQuery.isFetched;

  const value = {
    isLoaded,
    initialBank,
    isSelectedAll,
    token,
    bankQuery,
    selectedBankItems,
    addBank: addBankItem.mutateAsync,
    deleteBank: deleteBankItem.mutateAsync,
    deleteAllBankItems: deleteBankItems.mutateAsync,
    selectBankItem: selectBankItem.mutateAsync,
    selectAllBankItems: selectAllBankItems.mutateAsync,
  };

  return <BankContext.Provider value={value}>{children}</BankContext.Provider>;
};
