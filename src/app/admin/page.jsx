"use client";
import { NavTop } from "@/components/molecules/NavTop";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import CardNews from "@/components/molecules/CardNews";

const DashboardPage = () => {
  return (
    <>
      <NavTop label="Admin Dashboard" />
      <section className="text-bs-font_primary">
        <div className="relative h-[350px] rounded-lg bg-bs-primary lg:h-[300px]">
          <Image
            src={"/assets/images/doodleBackground.svg"}
            width={100}
            height={100}
            className="absolute object-cover object-center w-full h-full"
            alt="bg-header"
          />
          <div className="absolute w-full h-full lg:mt-20">
            <div className="grid grid-cols-1 gap-5 p-5 m-2 bg-white rounded-lg shadow-lg lg:m-10 lg:grid-cols-3">
              <div className="flex flex-col gap-3 lg:col-span-2">
                <div>
                  <p className="font-light">Total Pendapatan</p>
                  <p className="font-semibold">Rp. 50.000</p>
                </div>
                <div className="flex items-center justify-between ">
                  <div>
                    <p className="font-light">Total Poin</p>
                    <p className="font-semibold">2000 Point</p>
                  </div>
                  <div>
                    <Button color="orange">Tukar Point</Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center ">
                <div className="relative flex flex-col justify-center px-8 py-1 border-2 w-fit rounded-xl border-bs-secondary text-bs-secondary">
                  <div className="flex items-center justify-center">
                    <LiaShippingFastSolid size={30} />
                  </div>
                  <p>
                    Penjemputan <br /> Dalam Proses
                  </p>
                  <p className="absolute flex items-center justify-center w-10 h-10 bg-white border-2 rounded-full -right-5 -top-5 border-bs-secondary">
                    2
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-bs-font_primary">
        <h1 className="my-10 text-xl font-semibold">Baru di Bank Sampah</h1>
        <div className="grid grid-cols-1 gap-3">
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
