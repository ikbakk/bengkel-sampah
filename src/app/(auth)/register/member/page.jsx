import SignUpMember from "@/components/molecules/RegisterFormMember";
import { fetchItems } from "@/utils/fetchItems";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import axios from "axios";

const PartnerRegisterPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  const bank = [
    {
      wasteBankID: "e91d874b-ef1a-4fc5-a3da-4c5652adf6fb",
      name: "Sumut",
      address: "Sumatera Utara\n",
      members: 0,
    },
    {
      wasteBankID: "ac483771-ff2f-41b6-ae4a-ba4afefefe6a",
      name: "Sumbar",
      address: "Sumatera Barat\n",
      members: 0,
    },
    {
      wasteBankID: "45e293e0-ed2c-4edd-888f-1593df561b33",
      name: "DKI",
      address: "Jakarta",
      members: 0,
    },
  ];

  return <SignUpMember bank={bank} />;
};

export default PartnerRegisterPage;
