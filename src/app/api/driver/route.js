import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET() {
  const drivers = await prisma.driver.findMany({
    include: {
      user: {
        select: {
          userID: true,
          name: true,
          address: true,
          phoneNumber: true,
          role: true,
        },
      },
    },
  });

  const res = drivers.map((driver) => ({
    driverID: driver.driverID,
    driverStatus: driver.driverStatus,
    ...driver.user,
  }));

  return NextResponse.json(res);
}

export async function POST(req) {
  const { name, address, phoneNumber, passwordHash, role, balance, email } =
    await req.json();

  const newUser = await prisma.user.create({
    data: {
      name: name,
      address: address,
      phoneNumber: phoneNumber,
      passwordHash: passwordHash,
      email: email,
      role: role,
    },
  });

  const newDriver = await prisma.driver.create({
    data: {
      balance: balance,
      userID: newUser.userID,
    },
  });

  return NextResponse.json({
    message: "Success",
    data: {
      newDriver,
      ...newUser,
    },
  });
}

export async function PUT(req) {
  const { name, address, phoneNumber, userID, email } = await req.json();

  const newDataDriver = await prisma.user.update({
    where: {
      userID: userID,
    },
    data: {
      name: name,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
    },
  });

  return NextResponse.json({
    message: "Success",
    data: newDataDriver,
  });
}

export async function DELETE(req) {
  const { userID } = await req.json();

  await prisma.driver.delete({
    where: {
      userID: userID,
    },
  });

  return NextResponse.json({
    message: "Success",
  });
}
