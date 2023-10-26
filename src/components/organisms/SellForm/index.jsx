"use client";

import { Input } from "@material-tailwind/react";
import { useState } from "react";
import CustomDatePicker from "@/components/atoms/DatePicker";
import SellFormInput from "@/components/molecules/SellFormInput";

const SellForm = () => {
  const [val, setVal] = useState({
    startDate: new Date(),
    endDate: null,
  });

  const handleValChange = (newVal) => {
    setVal(newVal);
  };

  const formInputs = [
    {
      id: "input1",
      label: "Tanggal Penjemputan",
      children: <CustomDatePicker value={val} onChange={handleValChange} />,
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
    <form className="mt-4 flex flex-col gap-3 text-bs-font_primary">
      {formInputs.map((input) => (
        <SellFormInput key={input.id} label={input.label}>
          {input.children}
        </SellFormInput>
      ))}
    </form>
  );
};

export default SellForm;
