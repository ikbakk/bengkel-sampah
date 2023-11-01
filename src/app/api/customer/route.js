import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {
  getAllCustomer,
  addCustomer,
} from "@/utils/prismaQueries/customerRoutes";

export async function GET() {
  try {
    const customers = await getAllCustomer();

    const res = customers.map((customer) => ({
      customerID: customer.customerID,
      balance: customer.balance,
      ...customer.user,
    }));

    return NextResponse.json(
      { message: "Success get all customers", data: res },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const { name, address, phoneNumber, passwordHash, role, balance, email } =
      await req.json();

    const hashedPassword = await bcrypt.hash(passwordHash, 10);
    const data = {
      name,
      address,
      phoneNumber,
      role,
      balance,
      email,
      passwordHash: hashedPassword,
    };

    const newCustomer = await addCustomer(data);

    return NextResponse.json({
      message: "Success create customer",
      data: {
        ...newCustomer,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 },
    );
  }
}
