import { NextResponse } from "next/server";
import { BadRequestError } from "@/utils/errors";
import {
  updatePartner,
  getPartner,
  deletePartner,
} from "@/utils/prismaQueries/partnerRoutes";
import { NotFoundError } from "@/utils/errors";

export async function GET(req, { params }) {
  try {
    const { partnerID } = params;

    const partner = await getPartner(partnerID);

    return NextResponse.json({
      message: "Partner found",
      data: partner,
    });
  } catch (error) {
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

export async function PUT(req, { params }) {
  try {
    const { partnerID } = params;
    const { name, phoneNumber, address } = await req.json();

    if (!name || !address || !phoneNumber)
      throw new BadRequestError(
        "Missing required field name, address, phoneNumber",
      );

    await getPartner(partnerID);

    const newData = await updatePartner(partnerID, {
      name,
      address,
      phoneNumber,
    });

    return NextResponse.json({
      message: "Success",
      data: newData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: error.code,
      },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { partnerID } = params;

    await getPartner(partnerID);

    await deletePartner(partnerID);

    return NextResponse.json({
      message: "Sucessfully deleted partner",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: error.code,
      },
    );
  }
}
