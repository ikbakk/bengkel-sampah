import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET() {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }

    const banks = await prisma.waste_Bank.findMany();
    return NextResponse.json({
      message: "Waste banks found",
      data: banks,
    });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({
      message: "Waste banks not found",
    });
  }
}

export async function POST(req) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }

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
