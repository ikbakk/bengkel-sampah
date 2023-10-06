import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET(req, { params }) {
  const bankMembers = await prisma.waste_Bank.findUnique({
    where: {
      wasteBankID: params.bankID,
    },
    select: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  const response = bankMembers.members.map((member) => {
    return {
      id: member.userID,
      name: member.user.name,
      address: member.user.address,
      email: member.user.email,
      phoneNumber: member.user.phoneNumber,
      balance: member.balance,
    };
  });

  return NextResponse.json(response);
}

export async function POST(req, { params }) {
  const { name, address, email, phoneNumber, passwordHash } = await req.json();

  const { userID } = await prisma.user.create({
    data: {
      name,
      address,
      email,
      phoneNumber,
      passwordHash,
      role: "MEMBER",
    },
  });

  const newMember = await prisma.member.create({
    data: {
      balance: 0,
      wasteBankID: params.bankID,
      userID,
    },
  });

  return NextResponse.json({
    message: "New member created succesfully",
    data: newMember,
  });
}
