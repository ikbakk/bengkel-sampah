import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardNews = () => {
  return (
    <Link
      href={"#"}
      className=" grid grid-cols-1 items-center gap-5 rounded-lg bg-white p-3 shadow-lg lg:grid-cols-6"
    >
      <div>
        <Image
          src={"/assets/images/dummy.png"}
          width={100}
          height={100}
          alt="news image"
          className=" h-full w-full rounded-lg border border-black"
        />
      </div>

      <div className="lg:col-span-5">
        <div className="my-3 flex justify-between">
          <h1 className="font-semibold ">
            Meledanai Tata Kelola Sampah di DKI Jakarta
          </h1>
          <p className="text-bs-primary">Kamis, 5 Oktober 2023</p>
        </div>
        <p className="line-clamp-5">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi ab
          nobis ipsa omnis consequatur enim maiores, dolore consectetur
          voluptates id, vel, autem libero aliquid tempore dolorum ut in
          molestiae explicabo eveniet assumenda? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Nihil id quod ex mollitia harum
          dignissimos sapiente tempora voluptatem, itaque animi vel quam
          incidunt vitae ipsum porro aliquid voluptatum maxime pariatur
          obcaecati amet iusto nostrum eos. Inventore soluta delectus itaque
          velit optio natus, vitae ullam asperiores tenetur esse nisi
          necessitatibus dolores animi alias debitis similique nobis possimus
          pariatur vero! Eius placeat, laboriosam ipsa deserunt cumque
          consequatur odio ex accusantium, qui aperiam dignissimos et provident
          fuga reprehenderit perspiciatis dolor, voluptatibus non quia quidem
          quisquam odit. Quis alias porro aliquid ipsum! Sit exercitationem
          eligendi nihil, cum veniam inventore! Veniam qui excepturi ipsam
          praesentium!
        </p>
      </div>
    </Link>
  );
};

export default CardNews;
