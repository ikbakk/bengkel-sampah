import { NextResponse } from "next/server";
import {
  getTransactions,
  newTransaction,
} from "@/utils/prismaQueries/transactionsRoutes";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";
import { BadRequestError } from "../../../utils/errors";

export async function GET(req) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }

    const searchParams = req.nextUrl.searchParams;
    const filterBy = searchParams.get("filterBy");
    const filterValue = searchParams.get("filterValue");
    const transactions = await getTransactions(filterBy, filterValue);
    const resMessage =
      filterBy && filterValue
        ? `Transactions with ${filterBy} ${filterValue}: ${transactions.length}`
        : "Transactions found ";

    return NextResponse.json({
      message: resMessage,
      data: transactions,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Get transactions failed",
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
    const {
      userID,
      source,
      wastes,
      partnerID,
      wasteBankID,
      description,
      address,
    } = await req.json();

    if (!userID || !source || !wastes || !address)
      throw new BadRequestError(
        "Missing required fields (userID, source, wastes, address)",
      );

    const transaction = await newTransaction({
      userID,
      source,
      wastes,
      partnerID,
      wasteBankID,
      description,
      address,
    });

    return NextResponse.json(
      {
        message: "New transaction created",
        data: transaction,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "New transaction not created",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
