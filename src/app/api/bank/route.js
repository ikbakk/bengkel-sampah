import { NextResponse } from "next/server";
import {
  createBank,
  getBankList,
  deleteBanks,
} from "@/utils/prismaQueries/bankRoutes";
import { BadRequestError } from "@/utils/errors";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET() {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }

    const banks = await getBankList();
    return NextResponse.json({
      message: "Waste banks found",
      data: banks,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }

    const { name, address } = await req.json();

    if (!name || !address)
      throw new BadRequestError(`Missing field "name" or "address"`);

    const newBank = await createBank(name, address);

    return NextResponse.json(
      {
        message: "New waste bank created successfully",
        data: newBank,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message || "Waste banks not created",
      },
      {
        status: error.code || 500,
      },
    );
  }
}

export async function DELETE(req) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }

    const { bankIDs } = await req.json();

    if (!bankIDs) throw new BadRequestError(`Missing field "bankIDs"`);

    await deleteBanks(bankIDs);

    return NextResponse.json({
      message: "Waste banks successfuly deleted",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message || "Waste banks not deleted",
      },
      {
        status: error.code || 500,
      },
    );
  }
}
