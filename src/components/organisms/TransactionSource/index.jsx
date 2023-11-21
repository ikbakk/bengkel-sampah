"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

const TransactionSource = ({ source, id }) => {
  const session = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["source"],
    queryFn: async () => {
      const route = source === "PARTNER" ? "/api/partner" : "/api/bank";
      const res = await axios.get(`${baseURL}${route}/${id}`, {
        headers: {
          Authorization: `${session.data.accessToken}`,
        },
      });

      return res;
    },
  });

  return (
    <p className="capitalize">
      {isLoading
        ? "Loading..."
        : `${data.data.name} (${data.data.phoneNumber})`}
    </p>
  );
};

export default TransactionSource;
