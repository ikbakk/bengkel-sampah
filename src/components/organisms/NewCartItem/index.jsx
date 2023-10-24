"use client";

import {
  Typography,
  Select,
  Option,
  Card,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import CartQuantityItemCounter from "@/components/molecules/CartQuantityItemCounter";
import { CartContext } from "@/context/CartContext";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

const NewCartItem = ({ wastes, cartID }) => {
  const { setCartItems } = useContext(CartContext);
  const [newCartItem, setNewCartItem] = useState({
    wasteID: "",
    totalWeight: 0,
  });

  const handleSubmit = async () => {
    try {
      const { data: newItem } = await axios.post(
        `${baseURL}/api/cart/${cartID}/items`,
        {
          wasteID: newCartItem.wasteID,
          weight: newCartItem.totalWeight,
        },
      );

      setCartItems((prevCartItems) => [...prevCartItems, newItem.data]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (e) => {
    setNewCartItem({
      ...newCartItem,
      wasteID: e,
    });
  };

  const handleAdd = () => {
    setNewCartItem((prev) => ({
      ...prev,
      totalWeight: prev.totalWeight + 1,
    }));
  };

  const handleReduce = () => {
    setNewCartItem((prev) => ({
      ...prev,
      totalWeight: prev.totalWeight - 1,
    }));
  };

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
          {wastes?.map((waste) => {
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
        <Button onClick={handleSubmit} className="bg-bs-primary">
          Submit
        </Button>
      </CardBody>
    </Card>
  );
};

export default NewCartItem;
