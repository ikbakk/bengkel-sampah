import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { createBank, getBankList } from "@/utils/prismaQueries/bankRoutes";
import { BadRequestError } from "@/utils/errors";

export async function GET() {
  try {
    const banks = await getBankList();
    return NextResponse.json({
      message: "Waste banks found",
      data: banks,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req) {
  try {
    const { name, address } = await req.json();

    if (!name || !address)
      throw new BadRequestError(`Missing field "name" or "address"`);

    const newBank = await createBank(name, address);

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
    return NextResponse.json(
      {
        message: error.message || "Waste banks not created",
      },
      {
        status: error.code || 500,
      },
    );
  }
}
