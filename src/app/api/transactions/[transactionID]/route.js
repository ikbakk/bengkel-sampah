import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function PUT(req, { params }) {
  const { status } = await req.json();

  const updatedTransaction = await prisma.transaction.update({
    where: {
      transactionID: params.transactionID,
    },
    data: {
      status,
    },
  });

  return NextResponse.json({
    message: "Update success",
    data: updatedTransaction,
  });
}
