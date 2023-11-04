import { NextResponse } from "next/server";
import { deleteWaste } from "@/utils/prismaQueries/wasteroutes";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function DELETE(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { wasteID } = params;
    const deletedWaste = await deleteWaste(wasteID);

    return NextResponse.json({
      message: deletedWaste,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Delete failed",
      error: error.message,
    });
  }
}
