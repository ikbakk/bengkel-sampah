"use client";

import { useState, createContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getItemsWithOptions } from "@/utils/queryFn/getItemsWithOptions";
import {
  deletePartnerItem,
  deleteAllPartnerItems,
} from "@/utils/queryFn/partner";

export const PartnerContext = createContext(null);

export const PartnerProvider = ({ children, initialPartner, token }) => {
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const queryClient = useQueryClient();
  const fetchOptions = {
    headers: {
      Authorization: token,
    },
  };

  const partnerQuery = useQuery({
    queryKey: ["partners"],
    queryFn: async () => await getItemsWithOptions("partner", fetchOptions),
    initialData: initialPartner,
  });

  const { data: selectedPartnerItems } = useQuery({
    queryKey: ["selectedPartnerItems"],
    initialData: [],
  });

  const deletePartner = useMutation({
    mutationFn: (partnerID) => deletePartnerItem("/partner", partnerID, token),
    onSuccess: () => {
      queryClient.setQueryData(["selectedPartnerItems"], []);
      queryClient.invalidateQueries(["partners"]);
    },
  });

  const deleteAllPartner = useMutation({
    mutationFn: () =>
      deleteAllPartnerItems("/partner", {
        data: {
          partnersID: selectedPartnerItems,
        },
        headers: {
          Authorization: token,
        },
      }),
    onSuccess: () => {
      queryClient.setQueryData(["selectedPartnerItems"], []);
      queryClient.invalidateQueries(["partners"]);
    },
  });

  const selectPartner = useMutation({
    mutationFn: (userID) => {
      if (isSelectedAll) setIsSelectedAll(false);

      if (selectedPartnerItems.includes(userID)) {
        queryClient.setQueryData(
          ["selectedPartnerItems"],
          selectedPartnerItems.filter((id) => id !== userID),
        );
      } else {
        queryClient.setQueryData(["selectedPartnerItems"], [userID]);
        setIsSelectedAll(false);
      }
    },
  });
  const selectAllPartner = useMutation({
    mutationFn: (isChecked) => {
      if (isChecked) {
        queryClient.setQueryData(
          ["selectedPartnerItems"],
          partnerQuery.data.map((data) => data.userID),
        );
        setIsSelectedAll(true);
      } else {
        queryClient.setQueryData(["selectedPartnerItems"], []);
        setIsSelectedAll(false);
      }
    },
  });

  const isLoaded = partnerQuery.isSuccess && partnerQuery.isFetched;

  const value = {
    isLoaded,
    initialPartner,
    token,
    partnerQuery,
    isSelectedAll,
    selectedPartnerItems,
    selectPartner: selectPartner.mutateAsync,
    selectAllPartner: selectAllPartner.mutateAsync,
    deletePartner: deletePartner.mutateAsync,
    deleteAllPartner: deleteAllPartner.mutateAsync,
  };

  return (
    <PartnerContext.Provider value={value}>{children}</PartnerContext.Provider>
  );
};
