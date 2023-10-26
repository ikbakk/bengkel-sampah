import { BsTelephone } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import ContentHeader from "@/components/atoms/ContentHeader";
import Image from "next/image";

const SellHeader = ({ phoneNumber, address, distance, name, bgImage }) => {
  return (
    <ContentHeader>
      <Image
        alt="imgHeader"
        width={100}
        height={100}
        src={bgImage}
        className="absolute left-1/2 top-[10%] z-10 h-[60%] w-[75%] -translate-x-1/2 transform rounded-md object-cover shadow-md lg:h-[350px]"
      />
      <div className="absolute left-1/2 top-1/2 z-20 flex h-[150px] w-[55%] -translate-x-1/2 transform flex-col items-center justify-center gap-1 overflow-hidden rounded-md bg-white object-cover p-2 text-bs-font_primary shadow-md lg:top-full lg:gap-2 lg:p-4">
        <div className="z-10 flex w-full flex-col items-center justify-center md:flex-row md:justify-between">
          <h3 className="font-bold">{name}</h3>
          <div className="flex items-center justify-end gap-2">
            <HiOutlineLocationMarker className="h-5 w-5" />
            {distance && <p>{distance} km</p>}
          </div>
        </div>
        <p className="line-clamp-2 w-full">{address}</p>
        <div className="flex w-full items-center justify-start gap-4">
          <BsTelephone className="h-6 w-6" />
          <p>{phoneNumber}</p>
        </div>
      </div>
    </ContentHeader>
  );
};

export default SellHeader;
