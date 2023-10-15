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
  const { name, address, phoneNumber, email, driverStatus } = await req.json();
  const res = await prisma.user.update({
    where: {
      userID: id,
    },
    data: {
      name: name,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      driver: {
        update: {
          driverStatus: driverStatus,
        },
      },
    },
    include: {
      driver: true,
    },
  });

  return NextResponse.json({
    message: "Success",
    data: res,
  });
}

export async function DELETE(req, { params }) {
  const { id } = params;

  await prisma.driver.delete({
    where: {
      userID: id,
    },
  });

  return NextResponse.json({
    message: "Success",
  });
}
