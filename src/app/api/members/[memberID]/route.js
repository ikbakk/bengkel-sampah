import { NextResponse } from "next/server";
import { memberDetails, deleteMembers } from "@/utils/prismaQueries/bankRoutes";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }

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

export async function DELETE(req, { params }) {
  try {
    const { memberIDs } = params;

    await deleteMembers(memberIDs);

    return NextResponse.json({
      message: "Members successfuly deleted",
    });
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
