import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import {
  updatePartner,
  getPartner,
  deletePartner,
} from "@/utils/prismaQueries/partnerRoutes";

export async function GET(req, { params }) {
  try {
    const { partnerID } = params;


    const partner = await prisma.partner.findUnique({
      where: {
        partnerID: partnerID,
      },
    });

    if (!partner) {
      return NextResponse.json(
        {
          Error: "Partner not found",
          Message:
            "The requested partner does not exist in the system. Please verify the partner's ID and try again.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(partner);
  } catch (error) {}

}

export async function PUT(req, { params }) {
  try {
    const { partnerID } = params;
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

    const partner = await prisma.partner.findUnique({
      where: { partnerID: partnerID },
    });

    if (!partner) {
      return NextResponse.json(
        {
          Error: "Partner not found",
          Message:
            "The requested partner does not exist in the system. Please verify the partner's ID and try again.",
        },
        { status: 404 },
      );
    }

    const newData = await prisma.partner.update({
      where: {
        partnerID: partnerID,
      },
      data: {
        name: name,
        phoneNumber: phoneNumber,
        address: address,
      },
    });

    return NextResponse.json({
      message: "Success",
      data: newData,
    });
  } catch (error) {
    console.log(error);    
  }
}

export async function DELETE(req, { params }) {
  try {
    const { partnerID } = params;

    const partner = await prisma.partner.findUnique({
      where: { partnerID: partnerID },
    });

    if (!partner) {
      return NextResponse.json(
        {
          Error: "Partner not found",
          Message:
            "The requested partner does not exist in the system. Please verify the partner's ID and try again.",
        },
        { status: 404 },
      );
    }

    await prisma.partner.delete({
      where: {
        partnerID: partnerID,
      },
    });

    return NextResponse.json({
      message: "Sucess delete partner",
    });
  } catch (error) {
    console.log(error);
  }
}
