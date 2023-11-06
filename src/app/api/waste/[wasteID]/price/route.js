import { NextResponse } from "next/server";
import { getWaste, updateWastePrice } from "@/utils/prismaQueries/wasteroutes";

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { wasteID } = params;

    await getWaste(wasteID);

    const updatedWaste = await updateWastePrice(wasteID, body.price);

    return NextResponse.json({
      message: "Price update success",
      data: updatedWaste,
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
