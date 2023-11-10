/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Loading from "@/components/templates/Loading";
import NavbarHome from "@/components/molecules/Navbar";
import { MdOutlineNavigateNext } from "react-icons/md";
import CardHomeLayanan from "@/components/atoms/CardHomeLayanan";
import { LAYANAN } from "@/utils/constant/HOME_PAGE";
import { DiTechcrunch } from "react-icons/di";
import { FaChalkboardTeacher, FaRecycle, FaRegHandshake } from "react-icons/fa";
import Image from "next/image";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
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
      <section className=" mx-auto min-h-screen bg-[#EFFAFA] bg-[url('/images/bg-jumbotron.svg')] bg-cover bg-center">
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
      <section className="mx-auto min-h-screen bg-[#EFFAFA]  bg-cover bg-center">
        <div className="px-24 py-10">
          <h1 className="mb-10 text-center text-3xl font-semibold">
            Layanan Bengkel Sampah
          </h1>
          <div className="grid grid-cols-5 gap-5 ">
            {LAYANAN.map((item) => (
              <CardHomeLayanan
                key={item.id}
                imgUrl={item.url}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div className="px-24 py-10">
          <h1 className="mb-10 text-center text-3xl font-semibold">
            Statistik Bengkel Sampah
          </h1>
          <div className="grid grid-cols-4 gap-5 ">
            <div className="flex flex-col gap-3 text-center">
              <p className="text-6xl font-bold">752+</p>
              <p className="text-xs font-semibold text-bsHome-primary">
                TON SAMPAH DIKELOLA
              </p>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <p className="text-6xl font-bold">163</p>
              <p className="text-xs font-semibold text-bsHome-primary">
                KONSUMEN LAYANAN
              </p>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <p className="text-6xl font-bold">4</p>
              <p className="text-xs font-semibold text-bsHome-primary">
                BANK SAMPAH BINAAN
              </p>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <p className="text-6xl font-bold">12</p>
              <p className="text-xs font-semibold text-bsHome-primary">
                CAKUPAN WILAYAH
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 px-24 py-10">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={"/images/nazamudin-CEO.webp"}
              alt="garbage"
              className="w-full"
              width={100}
              height={100}
            />
          </div>
          <div className="ms-20 flex flex-col justify-center gap-5">
            <p className="text-xs font-semibold text-bsHome-primary">
              BENGKEL SAMPAH
            </p>
            <h1 className="text-5xl font-semibold">
              Aplikasi Pengelolaan Sampah Terpadu
            </h1>
            <p className="font-thin">
              Sampah yang tidak terkelola dengan baik dapat mencemari
              lingkungan, mengancam ekosistem, kesehatan masyarakat, dan
              merugikan sektor pariwisata dan ekonomi. Diperlukan sistem
              pengelolaan sampah yang terintegrasi, termasuk pengurangan,
              pemilahan, daur ulang, dan pengolahan yang ramah lingkungan untuk
              menjaga kebersihan dan kelestarian lingkungan
            </p>
            <p className="font-semibold">
              Sirkular ekonomi menjadi tonggak pengelolaan sampah. Dengan
              berbagi, memperbarui, dan mendaur ulang sumber daya, kita
              menciptakan lingkungan yang berkelanjutan dan meningkatkan
              kualitas hidup kita
            </p>
            <div>
              <p className="text-xs font-semibold">NAZAMUDDIN SIREGAR, S.T.</p>
              <p className="mt-2 text-xs font-thin">
                Founder, CEO of Bengkel Sampah
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-5 px-24 py-10">
          <div className="grid grid-cols-1 gap-5">
            <p className="text-xs font-semibold text-bsHome-primary">
              LAYANAN KAMI
            </p>
            <h1 className="text-5xl font-semibold">Komitmen Lingkungan</h1>
            <p className="font-thin">
              Menciptakan lingkungan yang lebih bersih, sehat, dan berkelanjutan
              bagi masyarakat dan generasi mendatang
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-start gap-3">
                <div className="text-bsHome-primary">
                  <FaRecycle size={30} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Daur Ulang dan Pemilahan</p>
                  <p className="font-thin">
                    Mengubah sampah menjadi bahan baku yang bernilai
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-start gap-3">
                <div className="text-bsHome-primary">
                  <DiTechcrunch size={30} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Inovasi dan Teknologi</p>
                  <p className="font-thin">
                    Pengembangan teknologi dan solusi yang efektif untuk
                    pengelolaan sampah
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-start gap-3">
                <div className="text-bsHome-primary">
                  <FaRegHandshake size={30} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Kolaborasi</p>
                  <p className="font-thin">
                    Memperkuat jaringan untuk mencapai tujuan berkelanjutan
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-start gap-3">
                <div className="text-bsHome-primary">
                  <FaChalkboardTeacher size={30} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">
                    Edukasi dan Kesadaran Masyarakat
                  </p>
                  <p className="font-thin">
                    Program edukasi, kampanye sosial, dan kegiatan partisipatif
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={"/images/care.webp"}
              alt="garbage"
              className="w-full"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="px-24 py-10">
          <h1 className="text-center text-4xl font-semibold text-bsHome-primary">
            BANK SAMPAH BINAAN
          </h1>
          <div className="mt-10 grid grid-cols-4 items-center justify-center">
            <img
              src="/images/BSR-300x300.webp"
              alt="logo-bsr"
              className="mx-auto inline-block h-40 w-40"
            />
            <img
              src="/images/BSPB-300x300.webp"
              alt="logo-bsr"
              className="mx-auto inline-block h-40 w-40"
            />
            <img
              src="/images/BSL-300x300.webp"
              alt="logo-bsr"
              className="mx-auto inline-block h-40 w-40"
            />
            <img
              src="/images/BST-300x300.webp"
              alt="logo-bsr"
              className="mx-auto inline-block h-40 w-40"
            />
          </div>
        </div>
      </section>
      <section className="flex h-[50vh] flex-col justify-center gap-5 bg-bsHome-primary px-24 py-10 text-white">
        <p className="text-sm font-semibold">PARTNERSHIP</p>
        <h1 className="text-5xl">Kolaborasi dengan Bang Beng</h1>
        <p className="text-sm font-thin">
          Kami terbuka berkolaborasi dengan berbagai stakeholder yang memiliki
          visi terhadap lingkungan yang berkelanjutan. <br /> Jangan ragu segera
          hubungi kami.
        </p>
        <button className="w-fit rounded-full bg-white px-10 py-3 text-bsHome-primary hover:border-2 hover:border-white hover:bg-transparent">
          Kontak
        </button>
      </section>
      <footer>
        <div className="grid grid-cols-4 items-center px-24 py-10">
          <div>
            <Image
              src={"/images/logo-bs.webp"}
              width={250}
              height={100}
              alt={"logo"}
            />
          </div>
          <div className="col-span-3">
            <p>
              Bengkel Sampah adalah perusahaan startup pengelolaan sampah
              terpadu yang berada di Tapanuli Selatan. Bengkel Sampah berdiri
              sejak 2021 dan telah memberi kebermanfaatan bagi masyarakat serta
              lingkungan. Bengkel Sampah terus berinovasi untuk menciptakan
              aplikasi untuk manajemen pengelolaan sampah, bank sampah dan
              edukasi lingkungan
            </p>
          </div>
        </div>
        <hr />
        <div className="flex flex-row justify-end gap-3 px-24 py-5 text-bsHome-primary">
          <BsFacebook className="cursor-pointer hover:text-black" size={30} />
          <BsTwitter className="cursor-pointer hover:text-black" size={30} />
          <BsInstagram className="cursor-pointer hover:text-black" size={30} />
          <BsYoutube className="cursor-pointer hover:text-black" size={30} />
        </div>
      </footer>
    </>
  );
}
