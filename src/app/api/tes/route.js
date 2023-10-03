import prisma from "@/utils/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  const customers = await prisma.customer.findMany({
    include: {
      user: {
        select: {
          userID: false,
          name: true,
          address: true,
          passwordHash: true,
          createdAt: true,
          phoneNumber: true,
          role: true,
        },
      },
    },
  });

  const res = customers.map((customer) => ({
    cutomerID: customer.userID,
    balance: customer.balance,
    userID: customer.userID,
    ...customer.user,
  }));

  return NextResponse.json(res);
}
