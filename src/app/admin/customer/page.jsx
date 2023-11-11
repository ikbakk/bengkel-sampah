"use client";

import Table from "@/components/atoms/Table";
import CardNews from "@/components/molecules/CardNews";
import ModalComponent from "@/components/molecules/Modal";
import { NavTop } from "@/components/molecules/NavTop";
import { Button, Checkbox, Input, Textarea } from "@material-tailwind/react";
import React, { useState } from "react";

const DashboardProfile = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [custData, setCustData] = useState([
    {
      id: "Cust000",
      name: "Arief",
      totalSell: 10,
      tel: "08123456789",
    },
    {
      id: "Cust001",
      name: "Adi",
      totalSell: 20,
      tel: "08123456789",
    },
    {
      id: "Cust000",
      name: "Ari",
      totalSell: 25,
      tel: "08123456789",
    },
  ]);
  const [individualChecks, setIndividualChecks] = useState(
    custData.map(() => false),
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
    setIndividualChecks(custData.map(() => !selectAll));
  };

  const handleIndividualCheck = (index) => {
    const newChecks = [...individualChecks];
    newChecks[index] = !newChecks[index];
    setIndividualChecks(newChecks);
    setSelectAll(newChecks.every((check) => check));
  };

  const handleDeleteSelected = () => {
    const updatedData = custData.filter((_, index) => !individualChecks[index]);
    setCustData(updatedData);
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
      id: `Cust00${custData.length + 1}`,
      name: newName,
      totalSell: 0,
      tel: newTel,
    };

    setCustData([...custData, newData]);
    setInputValue({
      name: "",
      address: "",
      tel: "",
    });
    setOpen(false); // Close the modal
  };

  return (
    <div>
      <NavTop label={"Kustomer"} />
      <div className="flex flex-col justify-between gap-2 md:flex-row lg:items-center">
        <h2 className="text-xl font-bold text-bs-font_primary">
          Kustomer Bengkel Sampah
        </h2>
        <Button
          onClick={handleOpen}
          className="max-w-max bg-bs-primary"
          size="sm"
        >
          Tambahkan Kustomer
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
              label={<p className="font-bold">Kustomer ID</p>}
              checked={selectAll}
              onChange={handleSelectAll}
            />
            {custData.length > 0 && allSelected && (
              <Button onClick={handleDeleteSelected} color="red" size="sm">
                Delete All
              </Button>
            )}
          </div>
        </Table.Head>
        <Table.Head>
          Nama <br /> Kustomer
        </Table.Head>
        <Table.Head>
          Total <br />
          Terima
        </Table.Head>
        <Table.Head>No. Telp</Table.Head>
        {custData &&
          custData.map((data, index) => (
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
              <Table.Data>{data.totalSell}</Table.Data>
              <Table.Data>
                <p>{data.tel}</p>
              </Table.Data>
            </Table.Body>
          ))}
      </Table>
      {/* End of Table */}

      <ModalComponent handlerOpen={handleOpen} open={open}>
        <div className="flex flex-col gap-3 m-3 text-black">
          <form
            className="grid grid-cols-1 gap-4 place-items-center md:grid-cols-2"
            onSubmit={handleFormSubmit}
          >
            <Input
              type="text"
              label="Nama Customer"
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
                label="Alamat Customer"
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
