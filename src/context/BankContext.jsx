"use client";
import { addItem, deleteItem } from "../utils/queryFn/bank";
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
    mutationFn: (bankID) =>
      deleteItem(`bank`, bankID, {
        headers: {
          Authorization: token,
        },
      }),
    onSuccess: () => {
      queryClient.setQueryData(["selectedBankItems"], []);
      bankQuery.refetch();
    },
  });

  // const deleteBankItems = useMutation({
  //   mutationFn: () =>
  //     deleteItems(`bank`, {
  //       data: {
  //         bankIDs: selectedBankItems,
  //       },
  //       headers: {
  //         Authorization: token,
  //       },
  //     }),
  //   onSuccess: () => {
  //     queryClient.setQueryData(["selectedBankItems"], []);
  //     bankQuery.refetch();
  //   },
  // });

  const selectAllBankItems = useMutation({
    mutationFn: (isChecked) => {
      if (isChecked) {
        queryClient.setQueryData(
          ["selectedBankItems"],
          bankQuery.data.map((data) => data.bankID),
        );
        setIsSelectedAll(true);
      } else {
        queryClient.setQueryData(["selectedBankItems"], []);
        setIsSelectedAll(false);
      }
    },
  });

  const selectBankItem = useMutation({
    mutationFn: (bankID) => {
      if (isSelectedAll) setIsSelectedAll(false);

      if (selectedBankItems.includes(bankID)) {
        queryClient.setQueryData(
          ["selectedBankItems"],
          selectedBankItems.filter((id) => id !== bankID),
        );
      } else {
        queryClient.setQueryData(["selectedBankItems"], [bankID]);
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
    selectAllBankItems: selectAllBankItems.mutateAsync,
    selectBankItem: selectBankItem.mutateAsync,
  };

  return <BankContext.Provider value={value}>{children}</BankContext.Provider>;
};
