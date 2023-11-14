import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthContext";
import { getServerSession } from "next-auth";
import NextTopLoader from "nextjs-toploader";

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
        <AuthProvider session={session}>
          <NextTopLoader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
