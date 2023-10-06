import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET(req, { params }) {
  const bank = await prisma.waste_Bank.findUnique({
    where: {
      wasteBankID: params.bankID,
    },
    include: {
      _count: {
        select: {
          members: true,
        },
      },
    },
  });

  const response = {
    id: bank.wasteBankID,
    name: bank.name,
    address: bank.address,
    members: bank._count.members,
  };

  return NextResponse.json(response);
}
