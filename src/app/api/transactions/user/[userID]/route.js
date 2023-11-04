import { NextResponse } from "next/server";
import { getUserTransactions } from "@/utils/prismaQueries/userTransactions";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET(req, { params }) {
  const jwt = await jwtVerify();

  if (!jwt) {
    return invalidJwtResponse;
  }
  const { userID } = params;

  const transaction = await getUserTransactions(userID);

  if (!transaction)
    return NextResponse.json(
      {
        message: "Transaction not found",
      },
      {
        status: 404,
      },
    );

  return NextResponse.json({
    message: "Transaction found",
    data: transaction,
  });
}
