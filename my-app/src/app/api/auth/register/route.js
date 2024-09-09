import { NextResponse } from "next/server";

import { signJWT } from "@/function/function";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  let body;
  try {
    body = await req.json();
    if (!body.email || !body.password || !body.name) {
      throw new Error();
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "A valid new user object has to be provided"
      },
      {
        status: 400
      }
    );
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      }
    });

    console.log("User registered: ", user);

    const token = await signJWT({
      userId: user.id
    });

    return NextResponse.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 400
      }
    );
  }
}
