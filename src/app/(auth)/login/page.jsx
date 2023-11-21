import FormLogin from "@/components/molecules/FormLogin";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <section className="flex min-h-screen">
      <div className="hidden bg-primaryimage lg:block lg:w-1/2"></div>
      <FormLogin />
    </section>
  );
}
