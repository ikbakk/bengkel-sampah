import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET(req, { params }) {
  const { customerID } = params;
  const res = await prisma.customer.findUnique({
    where: {
      userID: customerID,
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
  const { customerID } = params;
  const { name, address, phoneNumber, email } = await req.json();

  const newDataUser = await prisma.user.update({
    where: {
      userID: customerID,
    },
    data: {
      name: name,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
    },
  });

  return NextResponse.json({
    message: "Success",
    data: newDataUser,
  });
}
