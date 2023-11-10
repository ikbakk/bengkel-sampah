import { NextResponse } from "next/server";
import {
  newCartItem,
  deleteCartItems,
  findCart,
} from "@/utils/prismaQueries/cartRoutes";
import { NotFoundError } from "@/utils/errors";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function POST(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { cartID } = params;
    const { wasteID, weight } = await req.json();

    const cart = await findCart(cartID);

    if (!cart) throw new NotFoundError("Cart Not Found!");

    const cartItem = await newCartItem(cartID, wasteID, weight);

    return NextResponse.json(
      {
        message: "Cart item created",
        data: cartItem,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { cartID } = params;
    const { wasteIDs } = await req.json();

    await deleteCartItems(cartID, wasteIDs);

    return NextResponse.json(
      {
        message: "Cart items deleted",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}
