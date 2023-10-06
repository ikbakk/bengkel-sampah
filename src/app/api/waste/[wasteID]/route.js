import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function PUT(req, { params }) {
  const { price } = await req.json();

  const updatedWaste = await prisma.waste.update({
    where: {
      wasteID: params.wasteID,
    },
    data: {
      price,
    },
  });

  return NextResponse.json({
    message: "Update success",
    data: updatedWaste,
  });
}

export async function DELETE(req, { params }) {
  await prisma.waste.delete({
    where: {
      wasteID: params.wasteID,
    },
  });

  return NextResponse.json({
    message: "Delete success",
  });
}
