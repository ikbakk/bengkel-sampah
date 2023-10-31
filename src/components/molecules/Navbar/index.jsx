import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavbarHome = () => {
  return (
    <div className="grid grid-cols-2 border px-24 py-5">
      <div>
        <Image
          src={"/images/logo-bs.webp"}
          alt="Logo Bengkel Sampah"
          width={100}
          height={100}
        />
      </div>
      <div className=" hidden flex-row items-center justify-evenly font-extralight lg:flex">
        <Link href={"#"}>Beranda</Link>
        <Link href={"#"}>Profil</Link>
        <Link href={"#"}>Layanan</Link>
        <Link href={"#"}>Kontak</Link>
        <div>
          <Link
            href={"/login"}
            className="bg-bsHome-primary hover:text-bsHome-primary hover:border-bsHome-primary block rounded-full border-2 border-transparent px-7 py-2 text-white transition-all duration-300 hover:bg-transparent"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarHome;
