import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import {
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/utils/prismaQueries/customerRoutes";

import { BadRequestError } from "@/utils/errors";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { customerID } = params;
    const customer = await getCustomer(customerID);

    return NextResponse.json({
      message: "Successfuly found customer",
      data: customer,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: error.code || 500,
      },
    );
  }
}

export async function PUT(req, { params }) {
  try {
    // const jwt = await jwtVerify();

    // if (!jwt) {
    //   return invalidJwtResponse;
    // }
    const { customerID } = params;
    const { name, address, phoneNumber, email } = await req.json();

    // if (!name || !address || !phoneNumber || !email)
    //   throw new BadRequestError(
    //     'Missing required field "name" "address" "phoneNumber "email"',
    //   );

    const customer = await getCustomer(customerID);

    const newUser = await updateCustomer(customer.userID, {
      name,
      address,
      phoneNumber,
      email,
    });

    return NextResponse.json({
      message: "Successfully updated customer",
      data: {
        customerID,
        ...newUser,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: error.code || 500,
      },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    // const jwt = await jwtVerify();
    // console.log(jwt);

    // if (!jwt) {
    //   return invalidJwtResponse;
    // }
    const { customerID } = params;

    const user = await getCustomer(customerID);
    await deleteCustomer(user.userID);

    return NextResponse.json({
      message: "Successully deleted customer",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: error.code || 500,
      },
    );
  }
}
