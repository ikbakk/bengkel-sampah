import { NextResponse } from "next/server";
import {
  getTransactions,
  newTransaction,
} from "@/utils/prismaQueries/transactionsRoutes";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const transactions = await getTransactions(status);
    const resMessage = status
      ? `Transactions with status ${status}: ${transactions.length}`
      : "Transactions found ";

    return NextResponse.json({
      message: resMessage,
      data: transactions,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Get transactions failed",
      },
      {
        status: 400,
      },
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const transaction = await newTransaction(body);

    return NextResponse.json(
      {
        message: "New transaction created",
        data: transaction,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "New transaction not created",
        error,
      },
      {
        status: 400,
      },
    );
  }
}
