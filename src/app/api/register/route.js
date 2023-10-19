import bcrypt from "bcrypt";
import prisma from "@/utils/prismaClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name, phone, password } = body;

  if (!name || !phone || !password) {
    return NextResponse.json(
      {
        message: "Missing required fields",
      },
      { status: 400 },
    );
  }

  const exist = await prisma.user.findUnique({
    where: {
      phoneNumber: phone,
    },
  });

  if (exist) {
    return NextResponse.json(
      {
        message: "Phone number already been used",
      },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: name,
      phoneNumber: phone,
      passwordHash: hashedPassword,
    },
  });

  const newCustomer = await prisma.customer.create({
    data: {
      user: {
        connect: {
          userID: newUser.userID,
        },
      },
    },
  });

  if (!newCustomer) {
    prisma.user.delete({
      where: {
        userID: newUser.userID,
      },
    });

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      message: "Register success",
    },
    { status: 200 },
  );
}
