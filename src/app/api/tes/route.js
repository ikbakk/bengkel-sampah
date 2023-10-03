import prisma from "@/utils/prismaClient";
import { NextResponse } from "next/server";

const selectUser = {
  userID: false,
  name: true,
  address: true,
  passwordHash: true,
  createdAt: true,
  phoneNumber: true,
  role: true,
};

export async function GET() {
  const customers = await prisma.customer.findMany({
    include: {
      user: {
        select: selectUser,
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

export async function POST(req) {
  const body = await req.json();
  const newUser = await prisma.user.create({
    data: {
      phoneNumber: body.phoneNumber,
      name: body.name,
      address: body.address,
      passwordHash: body.passwordHash,
      role: body.role,
    },
  });

  // create customer
  const newCustomer = await prisma.customer.create({
    data: {
      balance: body.balance,
      userID: newUser.userID,
    },
  });

  return NextResponse.json({
    message: "Success",
    data: {
      newCustomer,
    },
  });
}

export async function DELETE(req) {
  const body = await req.json();
  await prisma.user.delete({
    where: {
      userID: body.userID,
    },
  });

  return NextResponse.json({
    message: "Success",
  });
}

export async function PUT(req) {
  const body = await req.json();
  const updatedUser = await prisma.user.update({
    where: {
      userID: body.userID,
    },
    data: {
      phoneNumber: body.phoneNumber,
      name: body.name,
      address: body.address,
      passwordHash: body.passwordHash,
      role: body.role,
    },
  });

  return NextResponse.json({
    message: "Success",
    data: updatedUser,
  });
}
