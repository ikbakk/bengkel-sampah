import React from "react";
import DashboardDriver from "@/components/templates/Driver";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchItems } from "@/utils/fetchItems";

const Driver = async () => {
  const session = await getServerSession(authOptions);
  const token = session.accessToken;

  const { data } = await fetchItems("/api/driver", token);
  return (
    <>
      <DashboardDriver token={token} data={data} />
    </>
  );
};

export default Driver;
