import CardNews from "@/components/molecules/CardNews";
import { NavTop } from "@/components/molecules/NavTop";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { fetchItems } from "@/utils/fetchItems";

const DashboardProfile = async () => {
  const session = await getServerSession(authOptions);
  const { data } = await fetchItems("/api/news", session.user.accessToken);
  return (
    <div>
      <NavTop label={"Berita"} />
      <div className="grid grid-cols-1 gap-5">
        {data.map((item) => (
          <CardNews
            key={item.newsID}
            title={item.title}
            image={item.imageUrl}
            content={item.content}
            date={item.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardProfile;
