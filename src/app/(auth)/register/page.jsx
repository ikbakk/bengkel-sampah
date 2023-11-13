import React from "react";
import SignUp from "../../../components/molecules/RegisterForm/RegisterForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return <SignUp />;
};

export default RegisterPage;
