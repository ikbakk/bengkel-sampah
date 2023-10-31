import { NextResponse } from "next/server";
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

    if (!partner) throw new NotFoundError("Partner not found");

    return NextResponse.json(
      { message: "Success get partner", data: partner },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { partnerID } = params;
    const { name, phoneNumber, address } = await req.json();

    const partner = await getPartner(partnerID);
    if (!partner) throw new NotFoundError("Partner not found");

    const data = {
      name,
      phoneNumber,
      address,
    };

    const newData = await updatePartner(partnerID, data);

    return NextResponse.json({
      message: "Success",
      data: newData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { partnerID } = params;

    const partner = await getPartner(partnerID);

    if (!partner) throw new NotFoundError("Partner not found");

    await deletePartner(partnerID);

    return NextResponse.json(
      {
        message: "Sucess delete partner",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}
