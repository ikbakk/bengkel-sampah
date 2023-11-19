"use client";
import { NavTop } from "@/components/molecules/NavTop";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import CardBeritaDashboard from "@/components/organisms/CardBeritaDashboard";
import { LiaShippingFastSolid } from "react-icons/lia";
import CardNews from "@/components/molecules/CardNews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchItems } from "@/utils/fetchItems";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const { status, data } = await fetchItems("/api/news", session.accessToken);

  if (status === 401) {
    redirect("/unauthorized");
  }

  return (
    <>
      <NavTop label="Admin Dashboard" />
      <CardBeritaDashboard />
      <section className="text-bs-font_primary">
        <h1 className="my-10 text-xl font-semibold">Baru di Bank Sampah</h1>
        <div className="grid grid-cols-1 gap-3">
          {data?.map((item) => (
            <CardNews
              key={item.newsID}
              title={item.title}
              image={item.imageUrl}
              content={item.content}
              date={item.createdAt}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
