import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET(req, { params }) {
  const { partnerID } = params;

  const partner = await prisma.partner.findUnique({
    where: {
      partnerID: partnerID,
    },
  });

  return NextResponse.json(partner);
}

export async function PUT(req, { params }) {
  const { partnerID } = params;
  const { name, phoneNumber, address } = await req.json();

  const newData = await prisma.partner.update({
    where: {
      partnerID: partnerID,
    },
    data: {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
    },
  });

  return NextResponse.json({
    message: "Success",
    data: newData,
  });
}
