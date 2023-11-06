import { NextResponse } from "next/server";
import { getWastes, newWaste } from "@/utils/prismaQueries/wasteroutes";
import { BadRequestError } from "@/utils/errors";

export async function GET() {
  try {
    const wastes = await getWastes();

    return NextResponse.json({
      message: "Wastes found",
      data: wastes,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: error.code || 500,
      },
    );
  }
}

export async function POST(req) {
  try {
    const { name, price, wasteType, unit = "kg" } = await req.json();

    if (!name || !price || !wasteType)
      throw new BadRequestError(
        "Missing required field name, price, wasteType",
      );
    const waste = await newWaste({ name, price, wasteType, unit });

    return NextResponse.json({
      message: "New waste created successfully",
      data: waste,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: error.code || 500,
      },
    );
  }
}
