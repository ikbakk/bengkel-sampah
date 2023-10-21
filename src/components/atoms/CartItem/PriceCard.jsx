"use client";

import { Card, CardBody, Typography } from "@material-tailwind/react";

const PriceCard = ({ title, value }) => {
  return (
    <Card className="w-[350px] scale-75 text-center md:scale-100">
      <CardBody>
        <Typography variant="h5" className="font-normal text-bs-secondary">
          {title}
        </Typography>
        <Typography variant="h4" className="font-bold text-bs-secondary">
          {value}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default PriceCard;
