import { NavTop } from "@/components/molecules/NavTop";
import React from "react";
import History from "@/components/templates/History";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { fetchItems } from "@/utils/fetchItems";

const DashboardProfile = async () => {
  const { user } = await getServerSession(authOptions);
  const res = await fetchItems(
    "/api/transactions/user/" + user.id,
    user.accessToken,
  );

  const transactions = res.data;

  return (
    <div>
      <NavTop label={"History"} />
      {transactions && <History transactions={transactions} />}
    </div>
  );
};

export default DashboardProfile;
