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

    const partner = await getPartner(partnerID);

    if (!partner) throw new Error("Partner not found");

    return NextResponse.json({
      message: "Success retrieving partner",
      data: partner,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}

export async function PUT(req, { params }) {
  try {
    const { partnerID } = params;
    const { name, phoneNumber, address } = await req.json();

    const newData = await updatePartner(partnerID, {
      name,
      phoneNumber,
      address,
    });

    return NextResponse.json({
      message: "Success updating partner",
      data: newData,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { partnerID } = params;

    const partner = await getPartner(partnerID);

    if (!partner) throw new Error("Partner not found");

    await deletePartner(partnerID);

    return NextResponse.json({
      message: "Successfully deleted partner with the id " + partnerID,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
