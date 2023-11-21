"use client";
import React from "react";
import ModalComponent from "@/components/molecules/Modal";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { WasteContext } from "@/context/WasteContext";

const AddBankModal = ({ open = false, handleOpen }) => {
  const { addWaste } = useContext(WasteContext);

  const [error, setError] = useState(null);

  const [inputValue, setInputValue] = useState([
    {
      name: "",
      price: "",
      unit: "",
      wasteType: "",
    },
  ]);

  if (!open) return null;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newName = event.target.elements.name.value;
    const newPrice = event.target.elements.price.value;
    const newUnit = event.target.elements.unit.value;
    const newWasteType = inputValue.wasteType;

    const newWaste = {
      name: newName,
      price: parseInt(newPrice),
      unit: newUnit,
      wasteType: newWasteType,
    };

    const waste = await addWaste(newWaste);

    if (!waste) {
      return setError("Gagal menambahkan sampah");
    }

    setInputValue({
      name: "",
      price: "",
      unit: "",
      wasteType: "",
    });
    handleOpen();
  };

  return (
    <ModalComponent handlerOpen={handleOpen} open={open}>
      <div className="m-3 flex flex-col gap-3 p-8 text-black">
        <h1 className="mb-3 text-2xl font-semibold">Tambah Sampah</h1>
        {error && <p className="text-sm text-red-500">{error}</p>}
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
            type="text"
            label="Unit cth: kg, l"
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
            onChange={(val) => setInputValue({ ...inputValue, wasteType: val })}
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
  );
};

export default AddBankModal;
