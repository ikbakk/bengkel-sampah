"use client";

import {
  Typography,
  Select,
  Option,
  Card,
  CardBody,
  Button,
  Spinner,
} from "@material-tailwind/react";
import CartQuantityItemCounter from "@/components/molecules/CartQuantityItemCounter";

import useCartAddItem from "@/hooks/useCartAddItem";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const NewCartItem = ({ wastes, cartID }) => {
  const { cartItems } = useContext(CartContext);
  const filteredWaste = wastes.filter(
    (waste) => !cartItems.some((item) => item.waste.wasteID === waste.wasteID),
  );

  const {
    handleAdd,
    handleChange,
    handleReduce,
    handleSubmit,
    newCartItem,
    loading,
  } = useCartAddItem(wastes, cartID);
  return (
    <Card>
      <CardBody className="flex flex-col gap-8">
        <Typography variant="h5" className="text-md capitalize md:text-xl">
          Tambahkan sampah anda
        </Typography>
        <Select
          onChange={(e) => handleChange(e)}
          className="capitalize"
          label="Pilih jenis sampah"
        >
          {filteredWaste?.map((waste) => {
            return (
              <Option
                value={waste.wasteID}
                key={waste.wasteID}
                className="capitalize"
              >
                {waste.name}
              </Option>
            );
          })}
        </Select>
        <CartQuantityItemCounter
          handleAdd={handleAdd}
          handleReduce={handleReduce}
          totalWeight={newCartItem.totalWeight}
        />

        <Button
          onClick={handleSubmit}
          className="flex w-full justify-center bg-bs-primary"
        >
          {loading ? <Spinner className="h-4 w-4" /> : "Submit"}
        </Button>
      </CardBody>
    </Card>
  );
};

export default NewCartItem;
