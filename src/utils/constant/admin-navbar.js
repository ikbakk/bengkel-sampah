// const { MdSpaceDashboard } = require("react-icons/md");
import { MdSpaceDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BiNews } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";

import {
  BsBagPlusFill,
  BsCartPlus,
  BsClockHistory,
  BsFillCalendar2CheckFill,
} from "react-icons/bs";
import { SiSimpleanalytics } from "react-icons/si";
import { FiMapPin } from "react-icons/fi";
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
    icon: <SiSimpleanalytics size={20} />,
    label: "Analisis",
    href: "/dashboard/analytic",
  },
  {
    icon: <BsFillCalendar2CheckFill size={20} />,
    label: "Jadwal",
    href: "/dashboard/jadwal",
  },
  {
    icon: <FiMapPin size={20} />,
    label: "Peta",
    href: "/dashboard/map",
  },
];
