import { NextResponse } from "next/server";
import { newCart, findCartByUserID } from "@/utils/prismaQueries/cartRoutes";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");

    if (!userID) {
      return NextResponse.json(
        {
          message: "Cart not found",
        },
        {
          status: 404,
        },
      );
    }

    const cart = await findCartByUserID(userID);

    return NextResponse.json(
      {
        message: "Cart found",
        data: cart,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.name,
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req) {
  try {
    const { userID } = await req.json();

    await newCart(userID);

    return NextResponse.json(
      {
        message: "Cart created",
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Cart creation failed",
        error: error.message,
      },
      {
        status: 400,
      },
    );
  }
}
