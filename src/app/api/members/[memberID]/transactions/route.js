import { NextResponse } from "next/server";
import {
  memberDetails,
  getMemberTransactions,
} from "@/utils/prismaQueries/bankRoutes";

export async function GET(req, { params }) {
  try {
    const { memberID, bankID } = params;
    const member = await memberDetails(memberID, bankID);
    const transactions = await getMemberTransactions(member.userID);

    const response = {
      memberID: member.memberID,
      userID: member.userID,
      name: member.name,
      address: member.address,
      email: member.email,
      phoneNumber: member.phoneNumber,
      balance: member.balance,
      transactions,
    };

    return NextResponse.json({
      message: "Member found",
      data: response,
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
