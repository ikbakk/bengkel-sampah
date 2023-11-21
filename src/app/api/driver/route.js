import { NextResponse } from "next/server";
import { getDrivers, createDriver } from "@/utils/prismaQueries/driverRoutes";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";
import bcrypt from "bcrypt";

// Check for Missing Fields
async function handleMissingFields(fields) {
  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      throw new Error(`${key} is missing!`);
    }
  }
}

export async function GET() {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
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
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { name, address, phoneNumber, password, role, email } =
      await req.json();

    await handleMissingFields({ name, address, phoneNumber, email, role });

    // Hash the password
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
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: error.code || 400 },
    );
  }
}
