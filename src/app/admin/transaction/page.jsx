import React from "react";
import Transactions from "@/components/templates/Transactions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchItems } from "@/utils/fetchItems";

const TransactionPage = async () => {
  const session = await getServerSession(authOptions);
  const transactions = await fetchItems(
    "/api/transactions",
    session.accessToken,
  );

  return (
    <>
      <Transactions data={transactions.data} token={session.accessToken} />
    </>
  );
};

export default TransactionPage;
