import React from "react";
import DaftarSampahTemplate from "@/components/templates/DaftarSampahTemplate";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchItems } from "@/utils/fetchItems";

const TransactionPage = async () => {
  const session = await getServerSession(authOptions);
  const data = await fetchItems("/api/waste", session.user?.accessToken);

  return <DaftarSampahTemplate data={data.data} />;
};

export default TransactionPage;
