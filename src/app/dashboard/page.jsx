import { NavTop } from "@/components/molecules/NavTop";
import React from "react";
import CardNews from "@/components/molecules/CardNews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchItems } from "@/utils/fetchItems";
import CardBeritaDashboard from "@/components/organisms/CardBeritaDashboard/index.jsx";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const data = await fetchItems("/api/news", session.user.accessToken);

  if (data.status === 401) {
    redirect("/unauthorized");
  }

  return (
    <>
      <NavTop label="Dashboard" />
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
