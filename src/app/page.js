"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const session = useSession();

  if (session.status === "loading") return <div>Loading...</div>;

  return (
    <div className="justify-left flex flex-col gap-2 text-left">
      <h1>Dashboard</h1>
      <p>
        Hi {session?.data?.user?.name}, you are {session?.status}
      </p>
      {session.status === "authenticated" && (
        <button onClick={() => signOut()} className="w-fit">
          Sign Out
        </button>
      )}
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </div>
  );
}
