import { NextResponse } from "next/server";
import { bankDetails } from "@/utils/prismaQueries/bankRoutes";

export async function GET(req, { params }) {
  try {
    const { bankID } = params;
    const bank = await bankDetails(bankID);

    if (!bank) throw new Error("Waste bank not found");

    const response = {
      id: bank.wasteBankID,
      name: bank.name,
      address: bank.address,
      members: bank._count.members,
    };

    return NextResponse.json({
      message: "Waste bank found",
      data: response,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
