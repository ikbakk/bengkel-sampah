import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const res = await prisma.driver.findUnique({
      where: {
        userID: id,
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
          Error: "Driver not found",
          Message:
            "The requested driver does not exist in the system. Please verify the user's ID and try again.",
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
    const { id } = params;
    const { name, address, phoneNumber, email, driverStatus } =
      await req.json();

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
      where: { userID: id },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Driver not found",
          message:
            "The requested driver does not exist in the system. Please verify the user's ID and try again.",
        },
        { status: 404 },
      );
    }

    const res = await prisma.user.update({
      where: {
        userID: id,
      },
      data: {
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        email: email,
        driver: {
          update: {
            driverStatus: driverStatus,
          },
        },
      },
      include: {
        driver: true,
      },
    });

    return NextResponse.json({
      message: "Success",
      data: res,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const driver = await prisma.user.findUnique({
      where: { userID: id },
    });

    if (!driver) {
      return NextResponse.json(
        {
          error: "Driver not found",
          message:
            "The requested driver does not exist in the system. Please verify the user's ID and try again.",
        },
        { status: 404 },
      );
    }

    await prisma.user.delete({
      where: {
        userID: id,
      },
    });

    return NextResponse.json({
      message: "Success",
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
