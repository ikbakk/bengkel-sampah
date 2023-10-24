import { NextResponse } from "next/server";
import {
  createPartner,
  getPartners,
} from "@/utils/prismaQueries/partnerRoutes";

export async function GET() {
  try {
    const partners = await prisma.partner.findMany();

    return NextResponse.json(partners);
  } catch (error) {
    return NextResponse(error, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, phoneNumber, address } = await req.json();

    if (!name || !address || !phoneNumber) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: "Please fill in all required fields.",
        },
        { status: 422 },
      );
    }

    const newPartner = await prisma.partner.create({
      data: {
        name: name,
        phoneNumber: phoneNumber,
        address: address,
      },
    });

    return NextResponse.json({
      message: "Success",
      data: newPartner,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Partner Not Created!" },
      { status: 500 },
    );
  }
}
