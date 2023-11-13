"use client";
import Link from "next/link";
import React from "react";
import TransactionModal from "@/components/organisms/TransactionModal";
import { transactionStatus } from "@/utils/constant/STATUS";

const dateOptions = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};

const TransactionItem = ({ transaction }) => {
  let date = new Date(transaction?.transactionDate);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Link
        href={"#"}
        key={transaction?.transactionID}
        className=" grid grid-cols-1 items-center gap-5 rounded-lg bg-white p-3 shadow-lg lg:grid-cols-8"
        onClick={handleOpen}
      >
        <div className="lg:col-span-5">
          <div className="flex justify-between">
            <div className="m-4 flex flex-col justify-evenly gap-3">
              <div>
                <p className="font-semibold text-gray-500">Tanggal Transaksi</p>
                <p className="text-black">
                  {date.toLocaleDateString("id-ID", dateOptions)}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">
                  Alamat Penjemputan
                </p>
                <p className=" text-black">
                  {transaction?.address ? transaction.address : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="ltr h-full p-5 lg:col-span-3">
          <div className="flex h-full w-full flex-col items-end justify-between border-s-2 border-gray-500">
            <div className="w-2/3 rounded-lg bg-green-700 p-2 text-center text-white">
              <p className="text-sm">{transactionStatus[transaction.status]}</p>
            </div>
            <p className="text-right text-xs">#{transaction?.transactionID}</p>
          </div>
        </div>
      </Link>
      {open && (
        <TransactionModal
          open={open}
          handleOpen={handleOpen}
          handleCancel={handleCancel}
          transaction={transaction}
        />
      )}
    </>
  );
};

export default TransactionItem;
