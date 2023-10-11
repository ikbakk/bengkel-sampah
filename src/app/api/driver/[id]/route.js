import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET(req, { params }) {
  const { id } = params;
  const res = await prisma.driver.findUnique({
    where: {
      userID: id,
    },
    include: {
      user: {
        select: {
          name: true,
          address: true,
          phoneNumber: true,
          email: true,
          role: true,
        },
      },
    },
  });
  return NextResponse.json(res);
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { driverStatus } = await req.json();
  const res = await prisma.driver.update({
    where: {
      userID: id,
    },
    data: {
      driverStatus: driverStatus,
    },
  });

  return NextResponse.json({
    message: "Success",
    data: res,
  });
}
