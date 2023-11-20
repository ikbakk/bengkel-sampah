import { NavTop } from "@/components/molecules/NavTop";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchItems } from "@/utils/fetchItems";
import Waste from "@/components/templates/Waste";
import { WasteProvider } from "@/context/WasteContext";

const AdminWaste = async () => {
  const session = await getServerSession(authOptions);

  const waste = await fetchItems("/api/waste", session?.accessToken);

  return (
    <>
      <WasteProvider initialWaste={waste?.data} token={session?.accessToken}>
        <NavTop label={"Waste"} />
        {waste && <Waste />}
      </WasteProvider>
    </>
  );
};

export default AdminWaste;
