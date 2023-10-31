import { Typography } from "@material-tailwind/react";

const SellFormInput = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h5">{label}</Typography>
      {children}
    </div>
  );
};

export default SellFormInput;
