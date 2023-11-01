"use client";

import { Button, CardBody } from "@material-tailwind/react";
import SellMethodButton from "@/components/atoms/SellMethodButton";
import CartHeaderTitle from "@/components/atoms/CartHeaderItem/Title";

import { useContext } from "react";
import { SellContext } from "@/context/SellContext";
import useSellConfirm from "@/hooks/useSellConfirm";

const SellMethods = () => {
  const { method, setMethod } = useContext(SellContext);
  const { handleSubmit } = useSellConfirm();

  const handleClick = (method) => {
    setMethod(method);
  };

  return (
    <CardBody className="flex flex-col gap-4">
      <CartHeaderTitle title="Metode Pembayaran" />
      <div className="-mt-4 flex w-full flex-row items-center justify-start gap-8 rounded-lg p-4 pl-0 ">
        <SellMethodButton
          onClick={() => handleClick("cash")}
          label="Cash"
          selected={method === "cash" ? true : false}
        />
        <SellMethodButton
          onClick={() => handleClick("point")}
          label="Point"
          selected={method === "point" ? true : false}
        />
      </div>
      <Button
        onClick={handleSubmit}
        fullWidth
        className="bg-bs-primary py-4 text-lg"
      >
        Ajukan penjemputan
      </Button>
    </CardBody>
  );
};

export default SellMethods;
