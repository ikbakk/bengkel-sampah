import { NextResponse } from "next/server";
import {
  createPartner,
  getPartners,
} from "@/utils/prismaQueries/partnerRoutes";
import { BadRequestError } from "@/utils/errors";

export async function GET() {
  try {
    const partners = await getPartners();
    return NextResponse.json({
      message: "Successfully retrieved partners list",
      data: partners,
    });
  } catch (error) {
    return NextResponse(
      {
        message: error.message,
      },
      {
        status: error.code || 500,
      },
    );
  }
}

export async function POST(req) {
  try {
    const { name, phoneNumber, address } = await req.json();

    if (!name || !phoneNumber)
      throw new BadRequestError("Missing required field name, phoneNumber");

    const newPartner = await createPartner({ name, phoneNumber, address });

    return NextResponse.json(
      {
        message: "Partners successfuly created",
        data: newPartner,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: error.code || 500,
      },
    );
  }
}
