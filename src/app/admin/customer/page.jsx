import React from "react";
import CustomerTemplate from "@/components/organisms/CustomerTemplate";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchItems } from "@/utils/fetchItems";

const Customer = async () => {
  const session = await getServerSession(authOptions);
  const data = await fetchItems("/api/customer", session?.accessToken);

  return <CustomerTemplate data={data.data} />;
};

export default Customer;
