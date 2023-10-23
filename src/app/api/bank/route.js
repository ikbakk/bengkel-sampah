import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET() {
  try {
    const banks = await prisma.waste_Bank.findMany();
    return NextResponse.json({
      message: "Waste banks found",
      data: banks,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Waste banks not found",
    });
  }
}

export async function POST(req) {
  try {
    const { name, address } = await req.json();

    const newBank = await prisma.waste_Bank.create({
      data: {
        address,
        name,
      },
    });

    return NextResponse.json(
      {
        message: "New waste bank created successfully",
        data: newBank,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json({
      message: "Waste banks not created",
    });
  }
}
