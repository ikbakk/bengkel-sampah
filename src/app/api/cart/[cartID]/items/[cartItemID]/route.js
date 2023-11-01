import { NextResponse } from "next/server";
import { updateCartItemWeight } from "@/utils/prismaQueries/cartRoutes";

export async function PUT(req, { params }) {
  try {
    const { cartItemID } = params;
    const { newWeight } = await req.json();

    const updatedCart = await updateCartItemWeight(cartItemID, newWeight);

    return NextResponse.json(
      {
        message: "Cart item updated",
        data: updatedCart,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}
