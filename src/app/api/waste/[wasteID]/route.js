import { NextResponse } from "next/server";
import { getWaste, deleteWaste } from "@/utils/prismaQueries/wasteroutes";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET(req, { params }) {
  try {
    const { wasteID } = params;
    const waste = await getWaste(wasteID);
    return NextResponse.json({
      message: "Waste found",
      data: waste,
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

export async function DELETE(req, { params }) {
  try {
    // const jwt = await jwtVerify();

    // if (!jwt) {
    //   return invalidJwtResponse;
    // }
    const { wasteID } = params;

    await getWaste(wasteID);

    await deleteWaste(wasteID);

    return NextResponse.json({
      message: "Successfuly deleted waste",
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
