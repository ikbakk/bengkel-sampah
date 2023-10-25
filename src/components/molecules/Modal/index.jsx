import { Dialog, DialogBody } from "@material-tailwind/react";
import React from "react";

const ModalComponent = ({ open, handlerOpen, children }) => {
  return (
    <Dialog open={open} onScroll size="lg" handler={handlerOpen}>
      <DialogBody className="max-h-[80vh] overflow-y-scroll">
        {children}
      </DialogBody>
    </Dialog>
  );
};

export default ModalComponent;
