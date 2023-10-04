import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function POST(req) {
  const body = await req.json();
  const newTransaction = await prisma.transaction.create({
    data: {
      userID: body.userID,
      status: body.status,
      source: body.source,
    },
  });
  return NextResponse.json({
    message: "Success",
    data: {
      newTransaction,
    },
  });
}
