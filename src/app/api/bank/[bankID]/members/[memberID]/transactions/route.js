import { NextResponse } from "next/server";
import {
  memberDetails,
  getMemberTransactions,
} from "@/utils/prismaQueries/bankRoutes";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { memberID, bankID } = params;
    const member = await memberDetails(memberID, bankID);
    const transactions = await getMemberTransactions(member.user.userID);

    const response = {
      memberID: member.memberID,
      name: member.user.name,
      address: member.user.address,
      email: member.user.email,
      phoneNumber: member.user.phoneNumber,
      balance: member.balance,
      transactions,
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
