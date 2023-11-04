import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export const jwtVerify = async () => {
  try {
    const headerInstance = headers();
    const authorization = headerInstance.get("authorization");
    const token = authorization.split(" ")[1];
    const jwtVerify = jwt.verify(token, secret);

    if (!jwtVerify) return false;

    return jwtVerify;
  } catch {
    return false;
  }
};

export const invalidJwtResponse = NextResponse.json(
  {
    message: "Unauthorized",
  },
  {
    status: 401,
  },
);
