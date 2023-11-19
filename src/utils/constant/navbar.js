// const { MdSpaceDashboard } = require("react-icons/md");
import { MdSpaceDashboard } from "react-icons/md";
import { FaUser, FaRecycle } from "react-icons/fa";
import { BiNews, BiSolidGroup, BiWalletAlt } from "react-icons/bi";
import { CiBank } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
import {
  BsBagPlusFill,
  BsCartPlus,
  BsClockHistory,
  BsFillCalendar2CheckFill,
  BsBarChart,
} from "react-icons/bs";
import { SiSimpleanalytics } from "react-icons/si";
import { FiMapPin } from "react-icons/fi";
import { PiCarDuotone } from "react-icons/pi";
import { RiStore3Fill } from "react-icons/ri";

export const NAVBAR_ITEM = [
  {
    icon: <MdSpaceDashboard size={20} />,
    label: "Beranda",
    href: "/dashboard",
  },
  {
    icon: <FaUser size={20} />,
    label: "Profil",
    href: "/dashboard/profile",
  },
  {
    icon: <BiNews size={20} />,
    label: "Berita",
    href: "/dashboard/berita",
  },
  {
    icon: <IoNotifications size={20} />,
    label: "Notifikasi",
    href: "/dashboard/notification",
  },
  {
    icon: <BsBagPlusFill size={20} />,
    label: "Jual Sampah",
    href: "/dashboard/sell",
  },
  {
    icon: <BsCartPlus size={20} />,
    label: "Keranjang Sampah",
    href: "/dashboard/cart",
  },
  {
    icon: <BsClockHistory size={20} />,
    label: "Riwayat",
    href: "/dashboard/history",
  },
  {
    icon: <FiMapPin size={20} />,
    label: "Peta",
    href: "/dashboard/map",
  },
];
export const ADMIN_NAVBAR_ITEM = [
  {
    icon: <MdSpaceDashboard size={20} />,
    label: "Beranda",
    href: "/admin",
  },
  {
    icon: <BiSolidGroup size={20} />,
    label: "Kustomer",
    href: "/admin/customer",
  },
  {
    icon: <PiCarDuotone size={20} />,
    label: "Driver",
    href: "/admin/driver",
  },
  {
    icon: <RiStore3Fill size={20} />,
    label: "Mitra",
    href: "/admin/mitra",
  },
  {
    icon: <CiBank size={20} />,
    label: "Bank",
    href: "/admin/bank",
  },
  {
    icon: <BiWalletAlt size={20} />,
    label: "Transaksi",
    href: "/admin/transaction",
  },
  {
    icon: <BsBarChart size={20} />,
    label: "Analisis",
    href: "/admin/analysis",
  },
  {
    icon: <FaRecycle size={20} />,
    label: "Waste",
    href: "/admin/waste",
  },
];
