import { NavTop } from "@/components/molecules/NavTop";
import React from "react";
import { BankProvider } from "@/context/BankContext";
import { fetchItems } from "@/utils/fetchItems";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Bank from "@/components/templates/Bank";

const DummyData = [
  {
    id: "Bank001",
    name: "Waste Bank 01",
    members: 10,
    adress: "Jl. Kemana Kita hari ini",
  },
  {
    id: "Bank002",
    name: "Waste Bank 02",
    members: 10,
    adress: "Jl. Kemana Kita hari ini",
  },
  {
    id: "Bank003",
    name: "Waste Bank 03",
    members: 10,
    adress: "Jl. Kemana Kita hari ini",
  },
];

const DashboardProfile = async () => {
  const { user } = await getServerSession(authOptions);

  const bank = await fetchItems("/api/bank", user.accessToken);

  if (bank.status === 401) {
    redirect("/login");
  }

  return (
    <BankProvider initialBank={bank?.data} token={user?.accessToken}>
      <NavTop label={"Bank"} />
      {bank && <Bank initialData={bank?.data} />}
    </BankProvider>
  );
};

export default DashboardProfile;
