import { NextResponse } from "next/server";
import { updateTransactionStatus } from "@/utils/prismaQueries/transactionsRoutes";

export async function PUT(req, { params }) {
  try {
    const { status } = await req.json();
    const { transactionID } = params;

    const updatedTransaction = await updateTransactionStatus(
      transactionID,
      status,
    );

    return NextResponse.json({
      message: "Transaction status update success",
      data: updatedTransaction,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Transaction status update failed",
    });
  }
}
