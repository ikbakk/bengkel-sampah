import { NextResponse } from "next/server";
import {
  bankMembers,
  createBankMember,
} from "@/utils/prismaQueries/bankRoutes";

export async function GET(req, { params }) {
  try {
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
    const body = await req.json();
    const { bankID } = params;

    const { name } = await createBankMember(body, bankID);

    return NextResponse.json({
      message: `${name} created succesfully`,
    });
  } catch (error) {
    return NextResponse.json({
      message: "New member not created",
    });
  }
}
