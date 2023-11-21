import React from "react";
import Transactions from "@/components/templates/Transactions";
import DaftarSampahTemplate from "@/components/templates/DaftarSampahTemplate";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchItems } from "@/utils/fetchItems";

const TransactionPage = async () => {
  const session = await getServerSession(authOptions);
  const data = await fetchItems("/api/waste", session.accessToken);
  const transactions = await fetchItems(
    "/api/transactions",
    session.accessToken,
  );

  console.log(transactions);
  // return <DaftarSampahTemplate data={data.data} />;
  return (
    <>
      <Transactions data={transactions.data} token={session.accessToken} />
    </>
  );
};

export default TransactionPage;
