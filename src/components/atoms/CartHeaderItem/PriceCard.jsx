"use client";

import { Card, CardBody, Typography } from "@material-tailwind/react";

const PriceCard = ({ title, value }) => {
  return (
    <Card
      variant="filled"
      className="w-[200px] text-center outline outline-bs-secondary lg:w-[350px]"
    >
      <CardBody>
        <Typography
          variant="h5"
          className="text-sm font-normal text-bs-secondary lg:text-lg"
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          className="text-base font-bold text-bs-secondary lg:text-2xl"
        >
          {value}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default PriceCard;
