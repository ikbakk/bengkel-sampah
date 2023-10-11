import { NextResponse } from "next/server";
import {
  getTransaction,
  updateTransactionStatus,
} from "@/utils/prismaQueries/transactionsRoutes";

export async function PUT(req, { params }) {
  try {
    const { status } = await req.json();
    const { transactionID } = params;

    const { status: newStatus } = await updateTransactionStatus(
      transactionID,
      status,
    );

    return NextResponse.json({
      message: "Transaction status update success",
      data: newStatus,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Transaction status update failed",
    });
  }
}

export async function GET(req, { params }) {
  try {
    const { transactionID } = params;
    const transactionDetails = await getTransaction(transactionID);

    return NextResponse.json({
      message: "Transaction found",
      data: transactionDetails,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Transaction not found",
    });
  }
}
