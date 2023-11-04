import { NextResponse } from "next/server";
import {
  getDetailCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/utils/prismaQueries/customerRoutes";
import { NotFoundError } from "@/utils/errors";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { customerID } = params;
    const customer = await getDetailCustomer(customerID);

    if (!customer) throw new NotFoundError("Customer Not Found!");

    return NextResponse.json(
      { message: "Customer Found", data: customer },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { customerID } = params;
    const { name, address, phoneNumber, email } = await req.json();

    const customer = await getDetailCustomer(customerID);

    if (!customer) throw new NotFoundError("Customer Not Found!");

    const data = {
      name,
      address,
      phoneNumber,
      email,
    };

    const newDataCustomer = await updateCustomer(customerID, data);

    return NextResponse.json(
      {
        message: "Success",
        data: newDataCustomer,
      },
      { status: 200 },
    );
  } catch (error) {
    // switch (error.code) {
    //   case "P2002":
    //     return NextResponse.json(
    //       {
    //         Error: `${error.meta.target[0]} already exists`,
    //         Message: `The provided ${error.meta.target[0]} is already associated with another user.`,
    //       },
    //       { status: 422 },
    //     );
    //   case "P2025":
    //     return NextResponse.json(
    //       {
    //         Error: "Customer not found",
    //         Message:
    //           "The requested Customer does not exist in the system. Please verify the user's ID and try again.",
    //       },
    //       { status: 404 },
    //     );
    //   default:
    //     console.log(error);
    //     break;
    // }
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
    const { customerID } = params;
    const customer = await getDetailCustomer(customerID);

    if (!customer) throw new NotFoundError("Customer Not Found!");

    await deleteCustomer(customerID);

    return NextResponse.json(
      {
        message: "Success delete customer",
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
