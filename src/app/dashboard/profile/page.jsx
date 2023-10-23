"use client";
import { NavTop } from "@/components/molecules/NavTop";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import React, { useState } from "react";
import { EditProfile } from "@/components/molecules/EditProfile";
import ModalComponent from "@/components/molecules/Modal";
import {
  KETENTUAN_PRIVASI,
  KEBIJAKAN_PRIVASI,
} from "@/utils/constant/ketentuanPrivasi";

const DashboardProfile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <div className="text-bs-font_primary">
      <NavTop label={"Profil"} />
      <div className="h-[150px]   bg-[url('/assets/images/header-profile.png')] bg-cover bg-no-repeat"></div>
      <div className="-mt-20 flex flex-row items-center gap-8 px-12">
        <Image
          src={"/assets/images/image-dummy.avif"}
          height={100}
          width={100}
          alt="profile-photo"
          className="h-[200px] w-[200px] rounded-full  border-8 border-bs-secondary/80 object-cover"
        />
        <h1 className="font-body text-3xl">Mobina Mirbagheri</h1>
      </div>
      <div className="mt-10 grid grid-cols-4 gap-5 px-12">
        <div className="flex flex-col gap-3">
          <button
            className={`text-black" "text-[#CACED8] hover:bg-[#EAF8F5]hover:text-bs-font_primary w-full  rounded-lg bg-[#EAF8F5] p-3 text-start font-semibold transition-all`}
          >
            Edit Profile
          </button>
          <button
            onClick={handleOpen}
            className={`text-black" "text-[#CACED8] hover:bg-[#EAF8F5]hover:text-bs-font_primary w-full  rounded-lg p-3 text-start font-semibold transition-all`}
          >
            Ketentuan Privasi
          </button>
          <button
            className={`text-black" "text-[#CACED8] hover:bg-[#EAF8F5]hover:text-bs-font_primary w-full  rounded-lg  p-3 text-start font-semibold transition-all`}
          >
            Pusat Bantuan
          </button>

          <Button color="red">Logout</Button>
        </div>
        <div className="col-span-3">
          <EditProfile />
          {/* KETENTUAN PRIVASI */}
          <ModalComponent handlerOpen={handleOpen} open={open}>
            <div className="m-3 flex flex-col gap-3 text-black">
              <p className="font-semibold">Ketentuan</p>
              <p>
                Selamat datang di Aplikasi Bank Sampah. Aplikasi ini disediakan
                oleh PT. Awikwok sebagai alat untuk memudahkan pengguna dalam
                mengelola dan berpartisipasi dalam program Bank Sampah kami.
                Harap baca dengan seksama dan pahami ketentuan dan kebijakan
                privasi ini sebelum menggunakan aplikasi ini.
              </p>
              <p className="font-semibold">Ketentuan Pengguna</p>
              <div>
                <ol className="list-decimal px-10">
                  {KETENTUAN_PRIVASI.map((item) => (
                    <li key={item.value}>{item.value}</li>
                  ))}
                </ol>
              </div>
              <p className="font-semibold">Kebijakan Privasi</p>
              <div>
                <ol className="list-decimal px-10">
                  {KEBIJAKAN_PRIVASI.map((item) => (
                    <li key={item.value}>{item.value}</li>
                  ))}
                </ol>
              </div>
              <div className="flex justify-center">
                <Button onClick={handleOpen} color="green">
                  Mengerti
                </Button>
              </div>
            </div>
          </ModalComponent>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
