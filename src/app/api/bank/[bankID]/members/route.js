import { NextResponse } from "next/server";
import {
  bankMembers,
  createBankMember,
} from "@/utils/prismaQueries/bankRoutes";
import bcrypt from "bcrypt";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";
import { BadRequestError } from "@/utils/errors";

export async function GET(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { bankID } = params;

    const members = await bankMembers(bankID);

    return NextResponse.json({
      message: "Bank members found",
      data: members,
    });
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

export async function POST(req, { params }) {
  try {
    const { name, address, email, phoneNumber, password } = await req.json();
    const { bankID } = params;

    if (!name || !phoneNumber || !password)
      throw new BadRequestError(
        'Missing required fields "name" , "phoneNumber", "password"',
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const body = {
      name,
      address,
      email,
      phoneNumber,
      passwordHash: hashedPassword,
    };

    const member = await createBankMember(body, bankID);

    return NextResponse.json(
      {
        message: `Member created succesfully`,
        data: member,
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

export async function DELETE(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { memberID } = params;

    await deleteMember(memberID);

    return NextResponse.json({
      message: "Member successfuly deleted",
    });
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
