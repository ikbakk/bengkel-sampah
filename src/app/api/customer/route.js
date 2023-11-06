import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { getCustomers } from "@/utils/prismaQueries/customerRoutes";
import { BadRequestError } from "@/utils/errors";

export async function GET() {
  try {
    const customers = await getCustomers();

    return NextResponse.json({
      message: "Successfuly retrieved users",
      data: customers,
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

// TODO : Delete? soalnya di route register udah bisa register customer

// export async function POST(req) {
//   try {
//     const { name, address, phoneNumber, password, email } = await req.json();

//     if (!name || !phoneNumber || !password) {
//       throw new BadRequestError(
//         'Missing field "name", "phoneNumber", "password',
//       );
//     }

//     const newUser = await prisma.user.create({
//       data: {
//         name: name,
//         address: address,
//         phoneNumber: phoneNumber,
//         passwordHash: password,
//         email: email,
//         role: role,
//       },
//     });

//     const newCustomer = await prisma.customer.create({
//       data: {
//         balance: balance,
//         userID: newUser.userID,
//       },
//     });

//     return NextResponse.json({
//       message: "Success",
//       data: {
//         ...newCustomer,
//         ...newUser,
//       },
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Customer Not Created!" },
//       { status: 500 },
//     );
//   }
// }
