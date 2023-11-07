import { NextResponse } from "next/server";
import { bankDetails } from "@/utils/prismaQueries/bankRoutes";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }

    const { bankID } = params;
    const bank = await bankDetails(bankID);

    return NextResponse.json({
      message: "Waste bank found",
      data: bank,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: error.code,
      },
    );
  }
}
