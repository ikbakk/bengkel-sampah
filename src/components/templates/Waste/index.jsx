"use client";
import Table from "@/components/atoms/Table";
import { Button, Checkbox, Input, Spinner } from "@material-tailwind/react";
import React, { useState, useContext } from "react";
import { WasteContext } from "@/context/WasteContext";
import AddWasteModal from "@/components/organisms/AddWasteModal";

const Waste = () => {
  const { isLoaded, wasteQuery } = useContext(WasteContext);

  if (!wasteQuery.data)
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Spinner className="h-12 w-12" color={"amber"} />
      </div>
    );

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpen = () => {
    setOpen(!open);
  };

  const filteredWasteData = wasteQuery.data?.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-2 md:flex-row lg:items-center">
        <h2 className="text-xl font-bold text-bs-font_primary">
          Daftar Sampah di Bengkel Sampah
        </h2>
        <Button
          disabled={!isLoaded}
          onClick={handleOpen}
          className="max-w-max bg-bs-primary"
          size="sm"
        >
          {isLoaded ? "Tambah Sampah" : <Spinner color={"white"} />}
        </Button>
      </div>
      <div className="mt-5 lg:w-64">
        <Input
          label="Search ..."
          icon={".."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <Table>
        <Table.Head>
          <div className="flex items-center gap-2">
            <p className="font-bold">ID Sampah</p>
          </div>
        </Table.Head>
        <Table.Head>Nama Sampah</Table.Head>
        <Table.Head>Harga</Table.Head>
        <Table.Head>Unit</Table.Head>
        <Table.Head>Tipe</Table.Head>
        {filteredWasteData &&
          filteredWasteData.map((data, index) => {
            return (
              <Table.Body key={index}>
                <Table.Data>
                  <div className="flex items-center gap-2">
                    <p>{data.wasteID}</p>
                  </div>
                </Table.Data>
                <Table.Data>
                  <p>{data.name}</p>
                </Table.Data>
                <Table.Data>{formatRupiah(data.price)}</Table.Data>
                <Table.Data>
                  <p>{data.unit}</p>
                </Table.Data>
                <Table.Data>
                  <span
                    className={`rounded-lg border px-4 py-1 text-xs font-semibold leading-tight ${
                      data.wasteType === "ORGANIC"
                        ? "border-green-500 text-green-500"
                        : "border-bs-primary text-bs-primary"
                    }`}
                  >
                    {data.wasteType}
                  </span>
                </Table.Data>
              </Table.Body>
            );
          })}
      </Table>
      {/* End of Table */}

      <AddWasteModal open={open} handleOpen={handleOpen} />
    </div>
  );
};

export default Waste;
