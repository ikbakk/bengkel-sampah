import { NextResponse } from "next/server";
import {
  getWastes,
  newWaste,
  deleteWastes,
} from "@/utils/prismaQueries/wasteroutes";
import { BadRequestError } from "@/utils/errors";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET() {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
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
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
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

export async function DELETE(req) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { wasteIDs } = await req.json();

    if (!wasteIDs) throw new BadRequestError("Missing required field wasteIDs");

    await deleteWastes(wasteIDs);

    return NextResponse.json({
      message: "Wastes deleted successfully",
    });
  } catch (error) {
    console.log(error);
    if (error.code !== typeof Number) error.code = 500;
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
