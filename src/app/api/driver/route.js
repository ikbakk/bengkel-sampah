import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET() {
  try {
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
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req) {
  try {
    const { name, address, phoneNumber, passwordHash, role, balance, email } =
      await req.json();

    if (!name || !address || !phoneNumber || !passwordHash || !role || !email) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: "Please fill in all required fields.",
        },
        { status: 422 },
      );
    }

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
        ...newDriver,
        ...newUser,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Driver Not Created!" },
      { status: 500 },
    );
  }
}
