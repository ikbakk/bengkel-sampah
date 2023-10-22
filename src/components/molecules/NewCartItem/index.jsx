"use client";

import {
  Typography,
  Select,
  Option,
  Card,
  CardBody,
} from "@material-tailwind/react";
import CartQuantityItemCounter from "@/components/atoms/CartQuantityItemCounter";

const NewCartItem = () => {
  return (
    <Card>
      <CardBody className="flex flex-col gap-8">
        <Typography variant="h5" className="text-md capitalize md:text-xl">
          Tambahkan sampah anda
        </Typography>
        <Select label="Pilih jenis sampah">
          <Option>1</Option>
          <Option>1</Option>
          <Option>1</Option>
          <Option>1</Option>
          <Option>1</Option>
        </Select>
        <CartQuantityItemCounter totalWeight={2} unit={"kg"} />
      </CardBody>
    </Card>
  );
};

export default NewCartItem;
