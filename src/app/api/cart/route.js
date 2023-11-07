import { NextResponse } from "next/server";
import { newCart, findCartByUserID } from "@/utils/prismaQueries/cartRoutes";
import { findCustomer } from "@/utils/prismaQueries/customerRoutes";
import { NotFoundError } from "@/utils/errors";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET(req) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");

    if (!userID) throw new NotFoundError("Cart not found!");

    const cart = await findCartByUserID(userID);

    return NextResponse.json(
      {
        message: "Cart found",
        data: cart,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}

export async function POST(req) {
  try {
    const { userID } = await req.json();

    const customer = await findCustomer(userID);
    if (!customer) throw new NotFoundError("User not found!");

    const cart = await newCart(userID);

    return NextResponse.json(
      { message: "Cart created", data: cart },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: error.code },
    );
  }
}
