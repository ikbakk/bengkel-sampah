import { NextResponse } from "next/server";
import { memberDetails } from "@/utils/prismaQueries/bankRoutes";

export async function GET(req, { params }) {
  try {
    const { memberID, bankID } = params;
    const member = await memberDetails(memberID, bankID);

    const response = {
      memberID: member.memberID,
      name: member.user.name,
      address: member.user.address,
      email: member.user.email,
      phoneNumber: member.user.phoneNumber,
      balance: member.balance,
      createdAt: member.user.createdAt,
    };

    return NextResponse.json({
      message: "Member found",
      data: response,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
