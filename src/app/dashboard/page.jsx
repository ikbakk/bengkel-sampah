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
      <NavTop label="Dashboard" />
      <section className="text-bs-font_primary">
        <div className="relative h-[350px] rounded-lg bg-bs-primary lg:h-[300px]">
          <Image
            src={"/assets/images/doodleBackground.svg"}
            width={100}
            height={100}
            className="absolute h-full w-full object-cover  object-center"
            alt="bg-header"
          />
          <div className="absolute  h-full w-full lg:mt-20">
            <div className="m-2 grid grid-cols-1 gap-5 rounded-lg bg-white p-5 shadow-lg lg:m-10 lg:grid-cols-3">
              <div className="flex  flex-col gap-3 lg:col-span-2">
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
                <div className="relative flex w-fit flex-col justify-center rounded-xl border-2 border-bs-secondary px-8 py-1 text-bs-secondary">
                  <div className="flex items-center justify-center">
                    <LiaShippingFastSolid size={30} />
                  </div>
                  <p>
                    Penjemputan <br /> Dalam Proses
                  </p>
                  <p className="absolute -right-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-bs-secondary bg-white">
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
