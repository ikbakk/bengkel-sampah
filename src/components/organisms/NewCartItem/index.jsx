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

import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";

const NewCartItem = ({ wastes }) => {
  const [newItem, setNewItem] = useState({
    wasteID: "",
    weight: 0,
  });
  const { cartQuery, addCartItem } = useContext(CartContext);
  const { data: cart } = cartQuery;
  const filteredWaste = wastes?.filter(
    (waste) =>
      !cart?.cartItems?.some((item) => item.waste.wasteID === waste.wasteID),
  );

  const handleWeightChange = (modifier) => {
    setNewItem((prev) => ({ ...prev, weight: prev.weight + modifier }));
  };

  const handleSubmit = () => {
    addCartItem.mutate(newItem);
  };

  return (
    <Card>
      <CardBody className="flex flex-col gap-8">
        <Typography variant="h5" className="text-md capitalize md:text-xl">
          Tambahkan sampah anda
        </Typography>
        <Select
          onChange={(e) => setNewItem({ ...newItem, wasteID: e })}
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
          totalWeight={newItem.weight}
          handleChange={handleWeightChange}
          loading={false}
        />

        <Button
          onClick={handleSubmit}
          className="flex w-full justify-center bg-bs-primary"
        >
          {addCartItem.isPending ? <Spinner className="h-4 w-4" /> : "Submit"}
        </Button>
      </CardBody>
    </Card>
  );
};

export default NewCartItem;
