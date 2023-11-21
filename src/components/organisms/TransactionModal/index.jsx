"use client";
import React from "react";
import Modal from "@/components/molecules/Modal";
import { transactionStatus } from "@/utils/constant/STATUS";

const TransactionModal = ({
  open = false,
  handleOpen,
  handleCancel,
  transaction,
}) => {
  if (!open) return null;
  return (
    <Modal open={open} handlerOpen={handleOpen}>
      <div className="flex flex-col gap-6 px-8 py-4">
        <div className="w-1/3 rounded-lg bg-green-700 p-2 text-center text-white ">
          <p className="text-sm">{transactionStatus[transaction.status]}</p>
        </div>
        <p className="text-xl font-bold">Agen Bengkel Sampah</p>
        <div>
          <p className="text-lg font-bold">BS Agen Pasar Minggu</p>
          <p className="text-sm">
            Jl. TB Simatupang No.Kav38, RW.8, Jati Padang, Kec. Ps. Minggu, Kota
            Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12540
          </p>
          <p className="text-sm">082198371829</p>
        </div>
        <p className="text-xl font-bold">Jenis Sampah :</p>
        <div className="ml-20 mr-10">
          {transaction?.wastes?.map((index, waste) => (
            <WasteItem key={index} waste={waste} />
          ))}
          <hr className="my-5 " />
          <div className="flex justify-end text-lg font-bold">
            <p className="mr-10">Total Harga : </p>
            <p>Rp {transaction?.totalPrice.toLocaleString()}</p>
          </div>
        </div>
        <p className="text-xl font-bold">Detail Penjemputan :</p>
        <div>
          <p className="mb-2 text-lg">Alamat</p>
          <p className="text-md font-bold">
            {transaction?.address ? transaction.address : "-"}
          </p>
        </div>
        <div>
          <p className="mb-2 text-lg">Deskripsi</p>
          <p className="text-md font-bold">
            {transaction?.description ? transaction.description : "-"}
          </p>
        </div>
        {transaction.status === "READY" && (
          <div
            className=" mx-auto w-1/2 rounded-lg bg-red-700 p-3 text-center font-bold text-white "
            onClick={handleCancel}
          >
            <p className="text-base">BATALKAN</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TransactionModal;

const WasteItem = ({ waste }) => {
  return (
    <div className="flex justify-between">
      <div>
        <p className="text-md font-bold">{waste.name}</p>
        <p className="text-md ml-2">{waste.formula}</p>
      </div>
      <div>
        <p className="text-md ">{waste.totalPrice}</p>
      </div>
    </div>
  );
};
