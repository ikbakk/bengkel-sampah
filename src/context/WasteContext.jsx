"use client";

import { addItem } from "../utils/queryFn/waste";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, createContext } from "react";
import { getItemsWithOptions } from "@/utils/queryFn/getItemsWithOptions";

export const WasteContext = createContext(null);

export const WasteProvider = ({ children, initialWaste, token }) => {
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const queryClient = useQueryClient();
  const fetchOptions = {
    headers: {
      Authorization: token,
    },
  };

  const wasteQuery = useQuery({
    queryKey: ["waste"],
    queryFn: async () => await getItemsWithOptions("waste", fetchOptions),
    initialData: initialWaste,
  });

  const { data: selectedWasteItems } = useQuery({
    queryKey: ["selectedWasteItems"],
    initialData: [],
  });

  const addWasteItem = useMutation({
    mutationFn: ({ name, price, unit, wasteType }) =>
      addItem(
        `waste`,
        {
          name,
          price,
          unit,
          wasteType,
        },
        token,
      ),
    onSuccess: () => {
      wasteQuery.refetch();
    },
  });

  const selectAllWasteItems = useMutation({
    mutationFn: (isChecked) => {
      if (isChecked) {
        queryClient.setQueryData(
          ["selectedWasteItems"],
          wasteQuery.data.map((data) => data.wasteID),
        );
        setIsSelectedAll(true);
      } else {
        queryClient.setQueryData(["selectedWasteItems"], []);
        setIsSelectedAll(false);
      }
    },
  });

  const selectWasteItem = useMutation({
    mutationFn: (wasteID) => {
      if (isSelectedAll) setIsSelectedAll(false);

      if (selectedWasteItems.includes(wasteID)) {
        queryClient.setQueryData(
          ["selectedWasteItems"],
          selectedWasteItems.filter((item) => item !== wasteID),
        );
      } else {
        queryClient.setQueryData(["selectedWasteItems"], [wasteID]);
        setIsSelectedAll(false);
      }
    },
  });

  const isLoaded = wasteQuery.isFetched;

  const value = {
    isLoaded,
    isSelectedAll,
    wasteQuery,
    selectedWasteItems,
    addWaste: addWasteItem.mutateAsync,
    selectWasteItem: selectWasteItem.mutateAsync,
    selectAllWasteItems: selectAllWasteItems.mutateAsync,
  };

  return (
    <WasteContext.Provider value={value}>{children}</WasteContext.Provider>
  );
};
