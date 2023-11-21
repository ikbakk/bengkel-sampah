"use client";

import TransactionSource from "@/components/organisms/TransactionSource";
import ModalComponent from "@/components/molecules/Modal";
import { NavTop } from "@/components/molecules/NavTop";
import {
  Button,
  Input,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { convertToIDR } from "@/lib/convertToIDR";
import React, { useState } from "react";

const TABLE_HEAD = ["Transaction ID", "Status", "Source", "User", ""];

const Transactions = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [openDelete, setOpenDelete] = React.useState("");

  const handleOpenDialog = (id) => {
    setOpenDelete(id);
  };

  return (
    <div>
      <NavTop label={"Daftar Transaksi"} />
      <div className="flex flex-col justify-between gap-2 md:flex-row lg:items-center">
        <h2 className="text-xl font-bold text-bs-font_primary">
          Daftar transaksi di Bengkel Sampah
        </h2>
      </div>
      <div className="mt-5 lg:w-64">
        <Input label="Search ..." icon={".."} />
      </div>

      {/* Table */}
      <Card className="mt-10 h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data
              .slice(0)
              .reverse()
              .map((item, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.transactionID}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.status}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.source}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {item.user.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button
                        variant="filled"
                        className="ms-3"
                        onClick={() =>
                          handleOpenDialog("edit_" + item.transactionID)
                        }
                        color="blue"
                      >
                        Detail
                      </Button>
                      <Dialog
                        size="xl"
                        open={openDelete === "edit_" + item.transactionID}
                        handler={() =>
                          handleOpenDialog("edit_" + item.transactionID)
                        }
                      >
                        <DialogHeader>Detail transaksi</DialogHeader>
                        <DialogBody className="flex flex-col gap-2">
                          <div>
                            <h2 className="text-lg font-bold">
                              Sumber sampah :{" "}
                              {item.source === "PARTNER"
                                ? "Mitra"
                                : "Bank Sampah"}
                            </h2>
                            <TransactionSource
                              source={item.source}
                              id={
                                item.source === "PARTNER"
                                  ? item.partnerID
                                  : item.bankID
                              }
                            />
                          </div>
                          <div>
                            <h2>Jenis Sampah :</h2>
                            <div>
                              {item.wasteSubmissions.map((waste) => {
                                return (
                                  <div
                                    className="pl-2 capitalize"
                                    key={waste.wasteName}
                                  >
                                    <p className="font-bold">
                                      {waste.wasteName}
                                    </p>
                                    <div className="flex items-center justify-between">
                                      <p>
                                        {waste.totalWeight} {waste.unit}
                                      </p>
                                      <p>{convertToIDR(waste.totalPrice)}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-center">
                            <h2 className="text-lg font-bold">Total :</h2>
                            <p>
                              {convertToIDR(
                                item.wasteSubmissions
                                  .map((waste) => waste.totalPrice)
                                  .reduce((a, b) => a + b, 0),
                              )}
                            </p>
                          </div>
                        </DialogBody>
                        <DialogFooter>
                          <Button
                            variant="text"
                            color="red"
                            onClick={() => {
                              handleOpenDialog("");
                            }}
                            className="mr-1"
                          >
                            <span>Kembali</span>
                          </Button>
                        </DialogFooter>
                      </Dialog>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Card>
      {/* End of Table */}

      <ModalComponent handlerOpen={handleOpen} open={open}>
        <div className="m-3 flex flex-col gap-3 p-8 text-black"></div>
      </ModalComponent>
    </div>
  );
};

export default Transactions;
