import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        user: {
          select: {
            userID: true,
            name: true,
            address: true,
            phoneNumber: true,
            email: true,
            role: true,
          },
        },
      },
    });

    const res = customers.map((customer) => ({
      customerID: customer.customerID,
      balance: customer.balance,
      ...customer.user,
    }));

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse(error, { status: 500 });
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

    const newCustomer = await prisma.customer.create({
      data: {
        balance: balance,
        userID: newUser.userID,
      },
    });

    return NextResponse.json({
      message: "Success",
      data: {
        ...newCustomer,
        ...newUser,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Customer Not Created!" },
      { status: 500 },
    );
  }
}
