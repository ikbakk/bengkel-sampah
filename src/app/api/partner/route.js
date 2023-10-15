import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET() {
  const partners = await prisma.partner.findMany();

  return NextResponse.json(partners);
}

export async function POST(req) {
  const { name, phoneNumber, address } = await req.json();

  const newPartner = await prisma.partner.create({
    data: {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
    },
  });

  return NextResponse.json({
    message: "Success",
    data: newPartner,
  });
}


