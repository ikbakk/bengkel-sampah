import { NextResponse } from "next/server";
import { memberDetails } from "@/utils/prismaQueries/bankRoutes";

export async function GET(req, { params }) {
  try {
    const { memberID, bankID } = params;
    const member = await memberDetails(memberID, bankID);

    return NextResponse.json({
      message: "Member found",
      data: member,
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
