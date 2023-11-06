import { NextResponse } from "next/server";
import {
  getTransaction,
  updateTransactionStatus,
} from "@/utils/prismaQueries/transactionsRoutes";

export async function PUT(req, { params }) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const { transactionID } = params;

    const transactionStatus = ["READY", "PROCESSING", "COMPLETED"];

    if (!transactionStatus.includes(status))
      return NextResponse.json(
        {
          message: "Invalid transaction status",
        },
        {
          status: 400,
        },
      );

    const { status: newStatus } = await updateTransactionStatus(
      transactionID,
      status,
    );

    return NextResponse.json({
      message: "Transaction status update success",
      data: newStatus,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Transaction status update failed",
      },
      {
        status: 400,
      },
    );
  }
}

export async function GET(req, { params }) {
  try {
    const { transactionID } = params;

    const transactionDetails = await getTransaction(transactionID);

    if (!transactionDetails)
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
      data: transactionDetails,
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
