import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function POST(req) {
  const {
    userID,
    source,
    wasteName,
    partnerID,
    wasteBankID,
    totalPrice,
    totalWeight,
  } = await req.json();
  let transactionData = {
    userID,
    source,
  };

  if (source === "PARTNER" && partnerID) {
    transactionData = {
      ...transactionData,
      partnerID,
    };
  } else {
    transactionData = {
      ...transactionData,
      wasteBankID,
    };
  }

  const { wasteID } = await prisma.waste.findFirst({
    where: {
      name: wasteName,
    },
  });

  const { transactionID } = await prisma.transaction.create({
    data: transactionData,
  });

  const newSubmission = await prisma.waste_Submission.create({
    data: {
      wasteID,
      transactionID: transactionID,
      totalPrice,
      totalWeight,
    },
  });

  return NextResponse.json({
    message: "Success",
    data: {
      newSubmission,
    },
  });
}
