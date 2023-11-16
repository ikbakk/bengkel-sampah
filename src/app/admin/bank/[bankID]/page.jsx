import { NavTop } from "@/components/molecules/NavTop";
import React from "react";
import { MemberProvider } from "@/context/MemberContext";
import BankDetails from "@/components/templates/BankDetails";
import { fetchItems } from "@/utils/fetchItems";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const BankDetailLayout = async ({ params }) => {
  const { user } = await getServerSession(authOptions);

  const bank = await fetchItems(`/api/bank/${params.bankID}`, user.accessToken);
  const members = await fetchItems(
    `/api/bank/${params.bankID}/members`,
    user.accessToken,
  );

  if (bank.status === 401 || members.status === 401) {
    redirect("/login");
  }

  let bankData = bank?.data;
  let memberData = members?.data;

  if (!bankData || !memberData) {
    return <NavTop label={"Loading..."} />;
  }

  return (
    <>
      <MemberProvider
        initialMember={memberData}
        bankID={params.bankID}
        token={user?.accessToken}
      >
        <NavTop label={`Detail Bank`} />
        <BankDetails data={bankData} />
      </MemberProvider>
    </>
  );
};

export default BankDetailLayout;
