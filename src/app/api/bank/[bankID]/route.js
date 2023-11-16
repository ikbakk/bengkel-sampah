import { NextResponse } from "next/server";
import { bankDetails, deleteBank } from "@/utils/prismaQueries/bankRoutes";
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

export async function DELETE(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }

    const { bankID } = params;

    await deleteBank(bankID);

    return NextResponse.json({
      message: "Waste bank deleted",
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
