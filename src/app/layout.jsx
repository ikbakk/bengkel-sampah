import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthContext";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BengkelSampah",
  description: "BengkelSampah admin website",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
