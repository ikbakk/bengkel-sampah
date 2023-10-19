import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET(req, { params }) {
  try {
    const { customerID } = params;
    const res = await prisma.customer.findUnique({
      where: {
        userID: customerID,
      },
      include: {
        user: {
          select: {
            name: true,
            address: true,
            phoneNumber: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!res) {
      return NextResponse.json(
        {
          Error: "Customer not found",
          Message:
            "The requested customer does not exist in the system. Please verify the user's ID and try again.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { customerID } = params;
    const { name, address, phoneNumber, email } = await req.json();

    if (!name || !address || !phoneNumber || !email) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: "Please fill in all required fields.",
        },
        { status: 422 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { userID: customerID },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Customer not found",
          message:
            "The requested customer does not exist in the system. Please verify the user's ID and try again.",
        },
        { status: 404 },
      );
    }

    const newDataUser = await prisma.user.update({
      where: {
        userID: customerID,
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
      data: newDataUser,
    });
  } catch (error) {
    switch (error.code) {
      case "P2002":
        return NextResponse.json(
          {
            Error: `${error.meta.target[0]} already exists`,
            Message: `The provided ${error.meta.target[0]} is already associated with another user.`,
          },
          { status: 422 },
        );
      case "P2025":
        return NextResponse.json(
          {
            Error: "Customer not found",
            Message:
              "The requested Customer does not exist in the system. Please verify the user's ID and try again.",
          },
          { status: 404 },
        );
      default: console.log(error);
        break;
    }
  }
}

export async function DELETE(req, { params }) {
  try {
    const { customerID } = params;

    const user = await prisma.user.findUnique({
      where: { userID: customerID },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Customer not found",
          message:
            "The requested customer does not exist in the system. Please verify the user's ID and try again.",
        },
        { status: 404 },
      );
    }

    await prisma.user.delete({
      where: {
        userID: customerID,
      },
    });

    return NextResponse.json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
  }
}
