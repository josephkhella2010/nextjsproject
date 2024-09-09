import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const userId = req.headers.get("userId");

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: Number(userId)
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: "User not found"
      },
      { status: 404 }
    );
  }
}
