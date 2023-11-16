import Image from "next/image";
import Link from "next/link";
import React from "react";
import { konversiTanggalIndonesia } from "@/utils/functions/changeTime";

const CardNews = ({ title, image, content, date }) => {
  return (
    <Link
      href={"#"}
      className=" grid grid-cols-1 items-center gap-5 rounded-lg bg-white p-3 shadow-lg lg:grid-cols-6"
    >
      <div>
        <Image
          src={image}
          width={100}
          height={100}
          alt="news image"
          className=" h-full w-full rounded-lg border border-black"
        />
      </div>

      <div className="lg:col-span-5">
        <div className="my-3 flex justify-between">
          <h1 className="font-semibold ">{title}</h1>
          <p className="text-bs-primary">{konversiTanggalIndonesia(date)}</p>
        </div>
        <p className="line-clamp-5">{content}</p>
      </div>
    </Link>
  );
};

export default CardNews;
