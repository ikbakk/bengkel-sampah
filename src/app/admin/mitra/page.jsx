import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Partner from "@/components/templates/partner";
import { NavTop } from "@/components/molecules/NavTop";
import { authOptions } from "@/lib/auth";
import { fetchItems } from "@/utils/fetchItems";
import { PartnerProvider } from "@/context/PartnerContext";

const PartnerLayout = async () => {
  const session = await getServerSession(authOptions);

  const partner = await fetchItems("/api/partner", session.accessToken);

  if (partner.status === 401) redirect("/login");
  return (
    <PartnerProvider
      initialPartner={partner?.data}
      token={session?.accessToken}
    >
      <NavTop label={"Mitra"} />
      {partner && <Partner />}
    </PartnerProvider>
  );
};

export default PartnerLayout;
