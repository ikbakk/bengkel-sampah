import { NextResponse } from "next/server";
import {
  deleteWaste,
  updateWastePrice,
} from "@/utils/prismaQueries/wasteroutes";

export async function PUT(req, { params }) {
  try {
    const { price } = await req.json();
    const { wasteID } = params;
    const updatedWaste = await updateWastePrice(wasteID, price);

    return NextResponse.json({
      message: "Price update success",
      data: updatedWaste,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Price update failed",
      error: error.message,
    });
  }
}

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
