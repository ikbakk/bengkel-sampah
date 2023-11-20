"use client";

import ModalComponent from "@/components/molecules/Modal";
import { NavTop } from "@/components/molecules/NavTop";
import { Button, Checkbox, Input, Textarea } from "@material-tailwind/react";
import React, { useState } from "react";
import Table from "@/components/atoms/Table";

const DashboardProfile = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [individualChecks, setIndividualChecks] = useState(
    driverMockData.map(() => false),
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
  const [driverData, setDriverData] = useState([
    {
      id: "Driver001",
      name: "Driver",
      totalPickUp: 10,
      status: "Online",
    },
    {
      id: "Driver002",
      name: "Driver2",
      totalPickUp: 12,
      status: "Offline",
    },
    {
      id: "Driver003",
      name: "Driver3",
      totalPickUp: 15,
      status: "Online",
    },
  ]);

  // Kalo gakepake Apus aja cuma buat simulasi select all

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIndividualChecks(driverData.map(() => !selectAll));
  };

  const handleIndividualCheck = (index) => {
    const newChecks = [...individualChecks];
    newChecks[index] = !newChecks[index];
    setIndividualChecks(newChecks);
    setSelectAll(newChecks.every((check) => check));
  };

  const handleDeleteSelected = () => {
    const updatedData = driverData.filter(
      (_, index) => !individualChecks[index],
    );
    setDriverData(updatedData);
    setIndividualChecks(updatedData.map(() => false));
    setSelectAll(false);
  };

  const allSelected = individualChecks.every((check) => check);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newName = event.target.elements.name.value;

    const newDriver = {
      id: `Driver00${driverData.length + 1}`,
      name: newName,
      totalPickUp: 0, // You can set an initial value for totalPickUp
      status: "Offline", // You can set an initial status
    };

    setDriverData([...driverData, newDriver]);
    setInputValue({
      name: "",
      address: "",
      tel: "",
    });
    setOpen(false); // Close the modal
  };

  return (
    <div>
      <NavTop label={"Driver"} />
      <div className="flex flex-col justify-between gap-2 md:flex-row lg:items-center">
        <h2 className="text-xl font-bold text-bs-font_primary">
          Driver Bengkel Sampah
        </h2>
        <Button
          onClick={handleOpen}
          className="max-w-max bg-bs-primary"
          size="sm"
        >
          Tambahkan Driver
        </Button>
      </div>
      <div className="mt-5 lg:w-64">
        <Input label="Search ..." icon={".."} />
      </div>

      <Table>
        <Table.Head>
          <Checkbox
            label={<p className="font-bold">Driver ID</p>}
            checked={selectAll}
            onChange={handleSelectAll}
          />
          {driverData.length > 0 && allSelected && (
            <Button onClick={handleDeleteSelected} color="red" size="sm">
              Delete All
            </Button>
          )}
        </Table.Head>
        <Table.Head>Nama Driver</Table.Head>
        <Table.Head>
          Total <br /> Penjemputan
        </Table.Head>
        <Table.Head>Status</Table.Head>

        {driverData &&
          driverData.map((driver, index) => (
            <Table.Body key={index}>
              <Table.Data>
                <div className="flex items-center gap-2">
                  <Checkbox
                    label={<p className="font-normal">{driver.id}</p>}
                    checked={individualChecks[index]}
                    onChange={() => handleIndividualCheck(index)}
                  />
                  {individualChecks[index] &&
                    !allSelected && ( // Only show delete button if checked
                      <Button onClick={() => handleDeleteSelected(index)}>
                        Delete
                      </Button>
                    )}
                </div>
              </Table.Data>
              <Table.Data>
                <p>{driver.name}</p>
              </Table.Data>
              <Table.Data>
                <p>{driver.totalPickUp}</p>
              </Table.Data>
              <Table.Data>
                <span
                  className={`rounded-lg border px-4 py-1 text-xs font-semibold leading-tight ${
                    driver.status === "Online"
                      ? "border-green-500 text-green-500"
                      : "border-red-500 text-red-500"
                  }`}
                >
                  {driver.status}
                </span>
              </Table.Data>
            </Table.Body>
          ))}
      </Table>

      <ModalComponent handlerOpen={handleOpen} open={open}>
        <div className="m-3 flex flex-col gap-3 text-black">
          <form
            className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2"
            onSubmit={handleFormSubmit}
          >
            <Input
              type="text"
              label="Nama Driver"
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
            <Textarea
              label="Alamat Driver"
              name="address"
              value={inputValue.address}
              onChange={(e) =>
                setInputValue({ ...inputValue, address: e.target.value })
              }
            />
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

const driverMockData = [
  {
    id: "Driver001",
    name: "Driver",
    totalPickUp: 10,
    status: "Online",
  },
  {
    id: "Driver002",
    name: "Driver2",
    totalPickUp: 12,
    status: "Offline",
  },
  {
    id: "Driver003",
    name: "Driver3",
    totalPickUp: 15,
    status: "Online",
  },
];
