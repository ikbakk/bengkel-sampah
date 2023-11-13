"use client";

import Table from "@/components/atoms/Table";
import ModalComponent from "@/components/molecules/Modal";
import { NavTop } from "@/components/molecules/NavTop";
import {
  Button,
  Checkbox,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import React, { useState } from "react";

const DashboardProfile = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [wasteData, setWasteData] = useState([
    {
      WasteID: "waste001",
      name: "Plastik",
      price: 3000,
      unit: 1,
      wasteType: "INORGANIC",
    },
    {
      WasteID: "waste002",
      name: "Kertas",
      price: 2000,
      unit: 1,
      wasteType: "ORGANIC",
    },
    {
      WasteID: "waste003",
      name: "Kaleng",
      price: 5000,
      unit: 1,
      wasteType: "INORGANIC",
    },
  ]);
  const [individualChecks, setIndividualChecks] = useState(
    wasteData.map(() => false),
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [inputValue, setInputValue] = useState([
    {
      name: "",
      price: null,
      unit: null,
      wasteType: "",
    },
  ]);

  // Kalo gakepake Apus aja cuma buat simulasi select all

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIndividualChecks(wasteData.map(() => !selectAll));
  };

  const handleIndividualCheck = (index) => {
    const newChecks = [...individualChecks];
    newChecks[index] = !newChecks[index];
    setIndividualChecks(newChecks);
    setSelectAll(newChecks.every((check) => check));
  };

  const handleDeleteSelected = () => {
    const updatedData = wasteData.filter(
      (_, index) => !individualChecks[index],
    );
    setWasteData(updatedData);
    setIndividualChecks(updatedData.map(() => false));
    setSelectAll(false);
  };

  const allSelected = individualChecks.every((check) => check);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newName = event.target.elements.name.value;
    const newPrice = event.target.elements.price.value;
    const newUnit = event.target.elements.unit.value;

    const newData = {
      WasteID: `Waste00${wasteData.length + 1}`,
      name: newName,
      price: newPrice,
      unit: newUnit,
      wasteType: inputValue.wasteType,
    };

    setWasteData([...wasteData, newData]);
    setInputValue({
      name: "",
      price: "",
      unit: "",
      wasteType: "",
    });
    setOpen(false); // Close the modal
  };

  const formatRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };

  return (
    <div>
      <NavTop label={"Daftar Sampah"} />
      <div className="flex flex-col justify-between gap-2 md:flex-row lg:items-center">
        <h2 className="text-xl font-bold text-bs-font_primary">
          Daftar Sampah di Bengkel Sampah
        </h2>
        <Button
          onClick={handleOpen}
          className="max-w-max bg-bs-primary"
          size="sm"
        >
          Tambahkan Daftar Sampah
        </Button>
      </div>
      <div className="mt-5 lg:w-64">
        <Input label="Search ..." icon={".."} />
      </div>

      {/* Table */}
      <Table>
        <Table.Head>
          <div className="flex items-center gap-2">
            <Checkbox
              label={<p className="font-bold">Waste ID</p>}
              checked={selectAll}
              onChange={handleSelectAll}
            />
            {wasteData.length > 0 && allSelected && (
              <Button onClick={handleDeleteSelected} color="red" size="sm">
                Delete All
              </Button>
            )}
          </div>
        </Table.Head>
        <Table.Head>Nama Sampah</Table.Head>
        <Table.Head>Harga</Table.Head>
        <Table.Head>Unit</Table.Head>
        <Table.Head>Tipe</Table.Head>
        {wasteData &&
          wasteData.map((data, index) => (
            <Table.Body key={index}>
              <Table.Data>
                <div className="flex items-center gap-2">
                  <Checkbox
                    label={<p className="font-normal">{data.WasteID}</p>}
                    checked={individualChecks[index]}
                    onChange={() => handleIndividualCheck(index)}
                  />
                  {individualChecks[index] &&
                    !allSelected && ( // Only show delete button if checked
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => handleDeleteSelected(index)}
                      >
                        Delete
                      </Button>
                    )}
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
          ))}
      </Table>
      {/* End of Table */}

      <ModalComponent handlerOpen={handleOpen} open={open}>
        <div className="m-3 flex flex-col gap-3 p-8 text-black">
          <form
            className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2"
            onSubmit={handleFormSubmit}
          >
            <Input
              type="text"
              label="Nama Sampah"
              name="name"
              value={inputValue.name}
              onChange={(e) =>
                setInputValue({ ...inputValue, name: e.target.value })
              }
            />
            <Input
              type="number"
              label="Harga"
              name="price"
              value={inputValue.tel}
              onChange={(e) =>
                setInputValue({ ...inputValue, price: e.target.value })
              }
            />
            <Input
              type="number"
              label="Jumlah Unit"
              name="unit"
              value={inputValue.unit}
              onChange={(e) =>
                setInputValue({ ...inputValue, unit: e.target.value })
              }
            />
            <Select
              name="wasteType"
              label="Tipe sampah"
              value={inputValue.wasteType}
              onChange={(value) =>
                setInputValue((prev) => ({ ...prev, wasteType: value }))
              }
            >
              <Option value="ORGANIC">ORGANIC</Option>
              <Option value="INORGANIC">INORGANIC</Option>
            </Select>
            <div className="w-full max-w-sm md:col-span-2">
              <Button type="submit" color="green" fullWidth={true}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </ModalComponent>
    </div>
  );
};

export default DashboardProfile;
