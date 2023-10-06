import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET(req, { params }) {
  const member = await prisma.member.findUnique({
    where: {
      userID: params.memberID,
      wasteBankID: params.bankID,
    },
    select: {
      memberID: true,
      balance: true,
      user: {
        include: {
          transactions: {
            select: {
              status: true,
              transactionDate: true,
              wasteSubmission: {
                select: {
                  totalPrice: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const transactions = member.user.transactions.map((transaction) => {
    return {
      status: transaction.status,
      transactionDate: transaction.transactionDate,
      totalPrice: transaction.wasteSubmission.totalPrice,
    };
  });

  const response = {
    memberID: member.memberID,
    name: member.user.name,
    address: member.user.address,
    email: member.user.email,
    phoneNumber: member.user.phoneNumber,
    balance: member.balance,
    createdAt: member.user.createdAt,
    transactions,
  };

  return NextResponse.json(response);
}
