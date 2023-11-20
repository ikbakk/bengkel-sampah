import { NavTop } from "@/components/molecules/NavTop";
import React from "react";
import History from "@/components/templates/History";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { fetchItems } from "@/utils/fetchItems";

const DashboardProfile = async () => {
  const session = await getServerSession(authOptions);
  const res = await fetchItems(
    "/api/transactions/user/" + session.user.userID,
    session.accessToken,
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
