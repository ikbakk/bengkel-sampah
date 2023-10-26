import { NextResponse } from "next/server";
import { NotFoundError } from "@/utils/errors";
import {
  getDriverDetail,
  updateDriver,
  deleteDriver,
} from "@/utils/prismaQueries/driverRoutes";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const response = await getDriverDetail(id);

    if (!response) throw new NotFoundError("Driver not found!");

    return NextResponse.json(
      { message: "Driver found!", data: response },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { name, address, phoneNumber, email, driverStatus } =
      await req.json();

    const driver = await getDriverDetail(id);
    if (!driver) throw new NotFoundError("Driver not found!");

    const body = {
      name,
      address,
      phoneNumber,
      email,
      driverStatus,
    };

    const response = await updateDriver(id, body);

    return NextResponse.json({
      message: "Success update Driver",
      data: response,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const driver = await getDriverDetail(id);

    if (!driver) throw new NotFoundError("Driver not found!");

    deleteDriver(id);

    return NextResponse.json(
      {
        message: "Success delete Driver",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}
