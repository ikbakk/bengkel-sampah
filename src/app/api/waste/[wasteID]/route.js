import { NextResponse } from "next/server";
import { deleteWaste } from "@/utils/prismaQueries/wasteroutes";

export async function DELETE(req, { params }) {
  try {
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
