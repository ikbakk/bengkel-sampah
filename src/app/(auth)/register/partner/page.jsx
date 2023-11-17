import SignUp from "@/components/molecules/RegisterForm/RegisterForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const PartnerRegisterPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return <SignUp apiRoute="/api/partner" />;
};

export default PartnerRegisterPage;
