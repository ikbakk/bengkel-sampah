import { NavTop } from "@/components/molecules/NavTop";
import React from "react";
import { BankProvider } from "@/context/BankContext";
import { fetchItems } from "@/utils/fetchItems";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Bank from "@/components/templates/Bank";

const BankLayout = async () => {
  const { user } = await getServerSession(authOptions);

  const bank = await fetchItems("/api/bank", user.accessToken);

  if (bank.status === 401) {
    redirect("/login");
  }

  return (
    <BankProvider initialBank={bank?.data} token={user?.accessToken}>
      <NavTop label={"Bank"} />
      {bank && <Bank />}
    </BankProvider>
  );
};

export default BankLayout;
