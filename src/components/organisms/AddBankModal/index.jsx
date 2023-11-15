"use client";
import React from "react";
import ModalComponent from "@/components/molecules/Modal";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { BankContext } from "@/context/BankContext";

const AddBankModal = ({ open = false, handleOpen }) => {
  if (!open) return null;

  const { addBank } = useContext(BankContext);

  const [error, setError] = useState(null);

  const [inputValue, setInputValue] = useState([
    {
      name: "",
      address: "",
    },
  ]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newName = event.target.elements.name.value;
    const newAddress = event.target.elements.address.value;

    const newBank = {
      name: newName,
      address: newAddress,
    };

    const bank = await addBank(newBank);

    if (!bank) {
      return setError("Gagal menambahkan bank");
    }

    setInputValue({
      name: "",
      address: "",
    });
    handleOpen();
  };

  return (
    <ModalComponent handlerOpen={handleOpen} open={open}>
      <div className="m-3 flex flex-col gap-3 text-black">
        <h1 className="mb-3 text-2xl font-semibold">Tambah Bank</h1>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <form
          className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2"
          onSubmit={handleFormSubmit}
        >
          <Input
            className="w-1/2"
            type="text"
            label="Nama Bank"
            name="name"
            value={inputValue.name}
            onChange={(e) =>
              setInputValue({ ...inputValue, name: e.target.value })
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
  );
};

export default AddBankModal;
