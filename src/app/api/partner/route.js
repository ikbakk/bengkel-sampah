import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import {
  createPartner,
  getPartners,
} from "@/utils/prismaQueries/partnerRoutes";
import { getUserByPhone } from "@/utils/prismaQueries/registerRoutes";
import { BadRequestError } from "@/utils/errors";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET() {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const partners = await getPartners();
    return NextResponse.json({
      message: "Successfully retrieved partners list",
      data: partners,
    });
  } catch (error) {
    return NextResponse(
      {
        message: error.message,
      },
      {
        status: error.code || 500,
      },
    );
  }
}

export async function POST(req) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { name, phoneNumber, address, password } = await req.json();

    if (!name || !phoneNumber || !password)
      throw new BadRequestError("Missing field");

    const exist = await getUserByPhone(phoneNumber);

    if (exist) throw new BadRequestError("Phone number already used");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPartner = await createPartner({
      name,
      phoneNumber,
      address,
      hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Partners successfuly created",
        data: newPartner,
      },
      {
        status: 201,
      },
    );
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
