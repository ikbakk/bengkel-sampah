import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET() {
  const banks = await prisma.waste_Bank.findMany();
  return NextResponse.json(banks);
}

export async function POST(req) {
  const { name, address } = await req.json();

  const newBank = await prisma.waste_Bank.create({
    data: {
      address,
      name,
    },
  });

  return NextResponse.json({
    message: "Success",
    data: newBank,
  });
}
