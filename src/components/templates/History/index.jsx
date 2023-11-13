import React from "react";
import HistoryStatus from "@/components/atoms/HistoryStatus";
import TransactionItem from "@/components/atoms/TransactionItem";
import TransactionModal from "@/components/organisms/TransactionModal";

const History = ({ transactions }) => {
  return (
    <>
      <div className="mb-10 w-1/4">
        <HistoryStatus />
        <TransactionModal />
      </div>
      <div className="grid grid-cols-1 gap-5">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction?.transactionID}
            transaction={transaction}
          />
        ))}
      </div>
    </>
  );
};

export default History;
