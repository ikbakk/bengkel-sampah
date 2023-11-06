import { NextResponse } from "next/server";
import { getUserTransactions } from "@/utils/prismaQueries/userTransactions";

export async function GET(req, { params }) {
  try {
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
