import { NextResponse } from "next/server";
import {
  createPartner,
  getPartners,
} from "@/utils/prismaQueries/partnerRoutes";

export async function GET() {
  const partners = await getPartners();

  return NextResponse.json({
    message: "Success retrieved partners",
    data: partners,
  });
}

export async function POST(req) {
  try {
    const { name, phoneNumber, address } = await req.json();

    const newPartner = await createPartner({ name, phoneNumber, address });

    return NextResponse.json({
      message: "New partner created successfully",
      data: newPartner,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
