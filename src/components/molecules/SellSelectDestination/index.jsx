"use client";

import { Select, Option } from "@material-tailwind/react";

import useSellConfirm from "@/hooks/useSellConfirm";

const SellSelectDestination = ({ partners }) => {
  const { handleDestinationChange } = useSellConfirm();
  return (
    <Select
      className="capitalize"
      label="Tempat pengiriman"
      onChange={(e) => handleDestinationChange(e)}
    >
      {partners.map((partner) => {
        return (
          <Option
            className="capitalize"
            value={partner.userID}
            key={partner.userID}
          >
            {partner.name}
          </Option>
        );
      })}
    </Select>
  );
};

export default SellSelectDestination;
