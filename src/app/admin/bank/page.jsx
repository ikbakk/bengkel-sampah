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
      id: "Bank001",
      name: "Waste Bank 01",
      members: 10,
      adress: "Jl. Kemana Kita hari ini",
    },
    {
      id: "Bank002",
      name: "Waste Bank 02",
      members: 10,
      adress: "Jl. Kemana Kita hari ini",
    },
    {
      id: "Bank003",
      name: "Waste Bank 03",
      members: 10,
      adress: "Jl. Kemana Kita hari ini",
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
      members: "",
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
    const newMember = event.target.elements.members.value;
    const newAddress = event.target.elements.address.value;

    const newData = {
      id: `Mitra00${mitraData.length + 1}`,
      name: newName,
      members: newMember,
      adress: newAddress,
    };

    setMitraData([...mitraData, newData]);
    setInputValue({
      name: "",
      member: "",
      adress: "",
    });
    setOpen(false); // Close the modal
  };

  return (
    <div>
      <NavTop label={"Bank"} />
      <div className="flex flex-col justify-between gap-2 md:flex-row lg:items-center">
        <h2 className="text-xl font-bold text-bs-font_primary">
          Bank Bengkel Sampah
        </h2>
        <Button
          onClick={handleOpen}
          className="max-w-max bg-bs-primary"
          size="sm"
        >
          Tambahkan Bank
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
        <Table.Head>Nama Bank</Table.Head>
        <Table.Head>
          <div className="mx-auto">
            Jumlah <br />
            Member
          </div>
        </Table.Head>
        <Table.Head>Alamat</Table.Head>
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
              <Table.Data>
                <p className="text-center">{data.members}</p>
              </Table.Data>
              <Table.Data>
                <p>{data.adress}</p>
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
              label="Jumlah Member"
              name="members"
              value={inputValue.members}
              onChange={(e) =>
                setInputValue({ ...inputValue, members: e.target.value })
              }
            />
            <div className="w-full md:col-span-2">
              <Textarea
                label="Alamat Bank"
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
