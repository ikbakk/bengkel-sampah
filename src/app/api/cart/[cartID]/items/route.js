import { NextResponse } from "next/server";
import { newCartItem } from "@/utils/prismaQueries/cartRoutes";

export async function POST(req, { params }) {
  try {
    const { cartID } = params;
    const { wasteID, weight } = await req.json();

    const cartItem = await newCartItem(cartID, wasteID, weight);

    return NextResponse.json({
      message: "Cart item created",
      data: cartItem,
    });
  } catch (error) {
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
