"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Loading from "@/components/templates/Loading";
import NavbarHome from "@/components/molecules/Navbar";
import { MdOutlineNavigateNext } from "react-icons/md";

export default function Home() {
  const session = useSession();

  if (session.status === "loading")
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    // <div className="justify-left flex flex-col gap-2 text-left">
    //   <h1>Dashboard</h1>
    //   <p>
    //     Hi {session?.data?.user?.name}, you are {session?.status}
    //   </p>
    //   {session.status === "authenticated" && (
    //     <button onClick={() => signOut()} className="w-fit">
    //       Sign Out
    //     </button>
    //   )}
    //   <Link href="/login">Login</Link>
    //   <Link href="/register">Register</Link>
    // </div>
    <>
      <section className=" mx-auto h-screen bg-[#EFFAFA] bg-[url('/images/bg-jumbotron.svg')] bg-cover bg-center">
        <NavbarHome />
        <div className="grid h-full grid-cols-2 px-24">
          <div className="flex flex-col justify-center gap-5">
            <p className="text-xs font-semibold text-bsHome-primary">
              PERTAMA DI TAPANULI SELATAN
            </p>
            <h1 className="text-7xl font-semibold">
              Ubah <br /> Sampah Jadi <br /> Rupiah
            </h1>
            <p className="text-sm font-extralight">
              Bengkel sampah hadir sebagai solusi manajemen limbah <br /> rumah
              tangga dan menciptakan nilai ekonomis sampah <br /> menjadi rupiah
            </p>
            <Link
              href={"#"}
              className="flex w-fit items-center gap-3 rounded-full border-2 border-bsHome-primary bg-transparent p-3 text-bsHome-primary transition-all hover:bg-bsHome-primary hover:text-white"
            >
              Jual Sampahmu Sekarang <MdOutlineNavigateNext />
            </Link>
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={"/images/logo-jumbotron.webp"}
              alt="bengkel sampah"
              className="h-full w-full object-cover"
              height={100}
              width={100}
            />
          </div>
        </div>
      </section>
    </>
  );
}
