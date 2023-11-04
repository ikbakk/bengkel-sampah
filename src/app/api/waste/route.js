import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { newWaste } from "@/utils/prismaQueries/wasteroutes";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET() {
  const jwt = await jwtVerify();

  if (!jwt) {
    return invalidJwtResponse;
  }
  const waste = await prisma.waste.findMany();
  return NextResponse.json({
    message: "Wastes found",
    data: waste,
  });
}

export async function POST(req) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const body = await req.json();
    const waste = await newWaste(body);

    return NextResponse.json({
      message: "New waste created successfully",
      data: waste,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Waste not created",
      error,
    });
  }
}
