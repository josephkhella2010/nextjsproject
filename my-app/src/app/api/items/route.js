import { NextResponse } from "next/server";
const prisma = new PrismaClient();
import React from "react";
import { PrismaClient } from "@prisma/client";
////////////////////////////////////////////////////////////////////////////////7
//get request
export async function GET(req) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search");
  let searchitem = [];
  if (search) {
    searchitem = await prisma.items.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive"
        }
      }
    });
  } else {
    searchitem = await prisma.items.findMany();
  }
  return NextResponse.json(searchitem);
}

///////////////////////////////////////////////////////////////7
//post request
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "post error" }, { status: 404 });
  }
  /*  const userId = req.headers.get("userId");
  console.log("User making the req: ", userId); */
  let newitem;
  try {
    const { title, quantity, description, category } = body;

    newitem = await prisma.items.create({
      data: {
        title,
        quantity,
        description,
        category
      }
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "post error" }, { status: 404 });
  }
  return NextResponse.json(newitem, { status: 201 });
}
