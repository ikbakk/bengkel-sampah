import { NextResponse } from "next/server";
import { getUserTransactions } from "@/utils/prismaQueries/userTransactions";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { userID } = params;

    const transaction = await getUserTransactions(userID);

    return NextResponse.json({
      message: "Transaction found",
      data: transaction,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Transaction failed",
      },
      {
        status: error.code || 500,
      },
    );
  }
}
