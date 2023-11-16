"use client";
import { deleteItem, deleteItems } from "../utils/queryFn/member";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, createContext } from "react";
import { getItemsWithOptions } from "@/utils/queryFn/getItemsWithOptions";

export const MemberContext = createContext(null);

export const MemberProvider = ({ children, initialMember, bankID, token }) => {
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const queryClient = useQueryClient();
  const fetchOptions = {
    headers: {
      Authorization: token,
    },
  };

  const memberQuery = useQuery({
    queryKey: ["member"],
    queryFn: async () =>
      await getItemsWithOptions(`bank/${bankID}/members`, fetchOptions),
    initialData: initialMember,
  });

  const { data: selectedMemberItems } = useQuery({
    queryKey: ["selectedMemberItems"],
    initialData: [],
  });

  const deleteMemberItem = useMutation({
    mutationFn: (memberID) => deleteItem(`members`, memberID, fetchOptions),
    onSuccess: () => {
      queryClient.setQueryData(["selectedMemberItems"], []);
      memberQuery.refetch();
    },
  });

  const deleteMemberItems = useMutation({
    mutationFn: () =>
      deleteItems("members", {
        data: {
          memberIDs: selectedMemberItems,
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

  const selectAllMemberItems = useMutation({
    mutationFn: (isChecked) => {
      if (isChecked) {
        queryClient.setQueryData(
          ["selectedMemberItems"],
          memberQuery.data.map((data) => data.memberID),
        );
        setIsSelectedAll(true);
      } else {
        queryClient.setQueryData(["selectedMemberItems"], []);
        setIsSelectedAll(false);
      }
    },
  });

  const selectMemberItem = useMutation({
    mutationFn: (memberID) => {
      if (isSelectedAll) setIsSelectedAll(false);

      if (selectedMemberItems.includes(memberID)) {
        queryClient.setQueryData(
          ["selectedMemberItems"],
          selectedMemberItems.filter((id) => id !== memberID),
        );
      } else {
        queryClient.setQueryData(["selectedMemberItems"], [memberID]);
        setIsSelectedAll(false);
      }
    },
  });

  const isLoaded = memberQuery.isSuccess && memberQuery.isFetched;

  const value = {
    isLoaded,
    isLoading: memberQuery.isLoading,
    isSelectedAll,
    memberQuery,
    selectedMemberItems,
    deleteMember: deleteMemberItem.mutate,
    deleteAllMemberItems: deleteMemberItems.mutate,
    selectMemberItem: selectMemberItem.mutate,
    selectAllMemberItems: selectAllMemberItems.mutate,
  };

  return (
    <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
  );
};
