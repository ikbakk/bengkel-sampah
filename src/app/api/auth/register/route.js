import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { BadRequestError } from "@/utils/errors";
import {
  getUserByPhone,
  registerCustomer,
} from "@/utils/prismaQueries/registerRoutes";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, password } = body;

    if (!name || !phone || !password)
      throw new BadRequestError("Missing field");

    const exist = await getUserByPhone(phone);
    if (exist) throw new BadRequestError("Phone number already used");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await registerCustomer({ name, phone, hashedPassword });

    return NextResponse.json(
      {
        message: "Register success",
        data: newUser,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: error.code,
      },
    );
  }
}
