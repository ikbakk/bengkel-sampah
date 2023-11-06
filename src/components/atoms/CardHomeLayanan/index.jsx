import Image from "next/image";
import React from "react";

const CardHomeLayanan = ({ imgUrl, label }) => {
  return (
    <div className="flex h-56 w-56 flex-col items-center justify-center gap-5 rounded-xl border-2 border-bsHome-primary  shadow-2xl ">
      <Image
        src={imgUrl}
        alt="garbage"
        className="w-[60%]"
        height={100}
        width={100}
      />
      <p className="text-center font-semibold">{label}</p>
    </div>
  );
};

export default CardHomeLayanan;
