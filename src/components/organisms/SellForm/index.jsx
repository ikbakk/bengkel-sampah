"use client";

import { Card, CardBody, Input } from "@material-tailwind/react";
import CustomDatePicker from "@/components/atoms/DatePicker";
import SellFormInput from "@/components/molecules/SellFormInput";
import SellSelectDestination from "@/components/molecules/SellSelectDestination";

import { useContext, useState } from "react";
import useSellConfirm from "@/hooks/useSellConfirm";
import { SellContext } from "@/context/SellContext";

const SellForm = ({ partners }) => {
  const { transactionBody, setTransactionBody } = useContext(SellContext);
  const { handleDateChange } = useSellConfirm();
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: null,
  });

  const handleChange = (e) => {
    setDate(e);
    handleDateChange(e.startDate);
  };

  const formInputs = [
    {
      id: "input1",
      label: "Tempat Pengiriman",
      children: <SellSelectDestination partners={partners} />,
    },
    {
      id: "input2",
      label: "Tanggal Penjemputan",
      children: (
        <CustomDatePicker value={date} onChange={(e) => handleChange(e)} />
      ),
    },
    {
      id: "input3",
      label: "Alamat Penjemputan",
      children: (
        <Input
          labelProps={{
            className: "hidden",
          }}
          onChange={(e) =>
            setTransactionBody((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }
          value={transactionBody.address}
          required
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
