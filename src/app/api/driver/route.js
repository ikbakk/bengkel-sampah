import { NextResponse } from "next/server";
import { getDrivers, createDriver } from "@/utils/prismaQueries/driverRoutes";

import bcrypt from "bcrypt";

export async function GET() {
  try {
    const drivers = await getDrivers();

    const response = drivers.map((driver) => ({
      driverID: driver.driverID,
      driverStatus: driver.driverStatus,
      ...driver.user,
    }));

    return NextResponse.json(
      { message: "Success", data: response },
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
    const { name, address, phoneNumber, password, role, email } =
      await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const body = {
      name,
      address,
      phoneNumber,
      email,
      role,
      passwordHash: hashedPassword,
    };

    const newDriver = await createDriver(body);

    return NextResponse.json(
      {
        message: "Success create Driver",
        data: {
          newDriver,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Driver Not Created" },
      { status: 500 },
    );
  }
}
