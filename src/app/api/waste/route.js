import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET() {
  const waste = await prisma.waste.findMany();
  return NextResponse.json(waste);
}

export async function POST(req) {
  const { name, price, wasteType, unit } = await req.json();

  const newWaste = await prisma.waste.create({
    data: {
      name,
      price,
      wasteType,
      unit,
    },
  });

  return NextResponse.json({
    message: "Success",
    data: newWaste,
  });
}
