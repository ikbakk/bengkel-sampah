import { NextResponse } from "next/server";
import {
  createPartner,
  getPartners,
} from "@/utils/prismaQueries/partnerRoutes";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET() {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const partners = await getPartners();

    return NextResponse.json(partners);
  } catch (error) {
    return NextResponse(error, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { name, phoneNumber, address } = await req.json();

    const data = {
      name,
      phoneNumber,
      address,
    };

    const newPartner = await createPartner(data);

    return NextResponse.json(
      {
        message: "Success created new partner",
        data: newPartner,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}
