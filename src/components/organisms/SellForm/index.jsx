"use client";

import { Card, CardBody, Input } from "@material-tailwind/react";
import CustomDatePicker from "@/components/atoms/DatePicker";
import SellFormInput from "@/components/molecules/SellFormInput";

import { SellContext } from "@/context/SellContext";
import { useContext } from "react";

const SellForm = () => {
  const { date, setDate } = useContext(SellContext);

  const handleValChange = (newVal) => {
    setDate(newVal);
  };

  const formInputs = [
    {
      id: "input1",
      label: "Tanggal Penjemputan",
      children: <CustomDatePicker value={date} onChange={handleValChange} />,
    },
    {
      id: "input2",
      label: "Alamat Penjemputan",
      children: (
        <Input
          labelProps={{
            className: "hidden",
          }}
          className="!border !border-gray-300 bg-white text-bs-font_primary shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-bs-font_primary focus:!border-t-bs-font_primary focus:ring-bs-font_primary/10"
          placeholder="Masukkan alamat"
          type="text"
        />
      ),
    },
  ];

  return (
    <Card className="w-full shadow-none">
      <CardBody>
        <form className="flex flex-col gap-3 text-bs-font_primary">
          {formInputs.map((input) => (
            <SellFormInput key={input.id} label={input.label}>
              {input.children}
            </SellFormInput>
          ))}
        </form>
      </CardBody>
    </Card>
  );
};

export default SellForm;
