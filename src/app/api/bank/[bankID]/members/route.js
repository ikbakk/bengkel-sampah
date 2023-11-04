import { NextResponse } from "next/server";
import {
  bankMembers,
  createBankMember,
} from "@/utils/prismaQueries/bankRoutes";
import bcrypt from "bcrypt";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { bankID } = params;
    const members = await bankMembers(bankID);

    const response = members.members.map((member) => {
      return {
        userID: member.userID,
        name: member.user.name,
        address: member.user.address,
        email: member.user.email,
        phoneNumber: member.user.phoneNumber,
        balance: member.balance,
      };
    });
    return NextResponse.json({
      message: "Bank members found",
      data: response,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Bank ID not found",
    });
  }
}

export async function POST(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { name, address, email, phoneNumber, password } = await req.json();
    const { bankID } = params;

    const hashedPassword = await bcrypt.hash(password, 10);

    const body = {
      name,
      address,
      email,
      phoneNumber,
      passwordHash: hashedPassword,
    };

    const member = await createBankMember(body, bankID);

    return NextResponse.json({
      message: `Member created succesfully`,
      data: member,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
