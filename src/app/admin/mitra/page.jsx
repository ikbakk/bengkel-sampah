"use client";

import Table from "@/components/atoms/Table";
import ModalComponent from "@/components/molecules/Modal";
import { NavTop } from "@/components/molecules/NavTop";
import { Button, Checkbox, Input, Textarea } from "@material-tailwind/react";
import React, { useState } from "react";

const DashboardProfile = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [mitraData, setMitraData] = useState([
    {
      id: "Mitra001",
      name: "Mitra Abadi",
      totalReceived: 10,
      status: "Online",
    },
    {
      id: "Mitra002",
      name: "CV Waste",
      totalReceived: 12,
      status: "Offline",
    },
    {
      id: "Mitra003",
      name: "Karya Abadi",
      totalReceived: 15,
      status: "Online",
    },
  ]);
  const [individualChecks, setIndividualChecks] = useState(
    mitraData.map(() => false),
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [inputValue, setInputValue] = useState([
    {
      name: "",
      adress: "",
      tel: "",
    },
  ]);

  // Kalo gakepake Apus aja cuma buat simulasi select all

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIndividualChecks(mitraData.map(() => !selectAll));
  };

  const handleIndividualCheck = (index) => {
    const newChecks = [...individualChecks];
    newChecks[index] = !newChecks[index];
    setIndividualChecks(newChecks);
    setSelectAll(newChecks.every((check) => check));
  };

  const handleDeleteSelected = () => {
    const updatedData = mitraData.filter(
      (_, index) => !individualChecks[index],
    );
    setMitraData(updatedData);
    setIndividualChecks(updatedData.map(() => false));
    setSelectAll(false);
  };

  const allSelected = individualChecks.every((check) => check);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newName = event.target.elements.name.value;
    const newTel = event.target.elements.tel.value;
    const newAddress = event.target.elements.address.value;

    const newData = {
      id: `Mitra00${mitraData.length + 1}`,
      name: newName,
      totalReceived: 0,
      status: "offline",
    };

    setMitraData([...mitraData, newData]);
    setInputValue({
      name: "",
      address: "",
      tel: "",
    });
    setOpen(false); // Close the modal
  };

  return (
    <div>
      <NavTop label={"Mitra"} />
      <div className="flex flex-col justify-between gap-2 md:flex-row lg:items-center">
        <h2 className="text-xl font-bold text-bs-font_primary">
          Mitra Bengkel Sampah
        </h2>
        <Button
          onClick={handleOpen}
          className="max-w-max bg-bs-primary"
          size="sm"
        >
          Tambahkan Mitra
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
              label={<p className="font-bold">Mitra ID</p>}
              checked={selectAll}
              onChange={handleSelectAll}
            />
            {mitraData.length > 0 && allSelected && (
              <Button onClick={handleDeleteSelected} color="red" size="sm">
                Delete All
              </Button>
            )}
          </div>
        </Table.Head>
        <Table.Head>Nama Mitra</Table.Head>
        <Table.Head>Total Terima</Table.Head>
        <Table.Head>Status</Table.Head>
        {mitraData &&
          mitraData.map((data, index) => (
            <Table.Body key={index}>
              <Table.Data>
                <div className="flex items-center gap-2">
                  <Checkbox
                    label={<p className="font-normal">{data.id}</p>}
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
              <Table.Data>{data.totalReceived}</Table.Data>
              <Table.Data>
                <span
                  className={`rounded-lg border px-4 py-1 text-xs font-semibold leading-tight ${
                    data.status === "Online"
                      ? "border-green-500 text-green-500"
                      : "border-red-500 text-red-500"
                  }`}
                >
                  {data.status}
                </span>
              </Table.Data>
            </Table.Body>
          ))}
      </Table>
      {/* End of Table */}

      <ModalComponent handlerOpen={handleOpen} open={open}>
        <div className="m-3 flex flex-col gap-3 text-black">
          <form
            className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2"
            onSubmit={handleFormSubmit}
          >
            <Input
              type="text"
              label="Nama Mitra"
              name="name"
              value={inputValue.name}
              onChange={(e) =>
                setInputValue({ ...inputValue, name: e.target.value })
              }
            />
            <Input
              type="number"
              label="Nomor Telepon"
              name="tel"
              value={inputValue.tel}
              onChange={(e) =>
                setInputValue({ ...inputValue, tel: e.target.value })
              }
            />
            <div className="w-full md:col-span-2">
              <Textarea
                label="Alamat Mitra"
                name="address"
                value={inputValue.address}
                onChange={(e) =>
                  setInputValue({ ...inputValue, address: e.target.value })
                }
              />
            </div>
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
