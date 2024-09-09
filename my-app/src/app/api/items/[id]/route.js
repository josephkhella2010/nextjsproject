import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
////////////////////////////////////////////////////////////
//get request by one
export async function GET(req, { params }) {
  const { id } = params;
  let res;

  try {
    res = await prisma.items.findFirstOrThrow({
      where: {
        id: Number(id)
      }
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "faile get by id" }, { status: 404 });
  }
  return NextResponse.json(res, { status: 200 });
}
//////////////////////////////////////////////////////////////////////////////7
// delete request
export async function DELETE(req, { params }) {
  const { id } = params;
  let res;
  try {
    res = await prisma.items.delete({
      where: {
        id: Number(id)
      }
    });
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "faile delete by id" }, { status: 404 });
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// put request

export async function PUT(req, { params }) {
  const { id } = params;
  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "faile uptodated by id" }, { status: 404 });
  }
  let uptodateitem;
  try {
    const { title, quantity, description, category } = body;
    uptodateitem = await prisma.items.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        quantity,
        description,
        category
      }
    });
    return NextResponse.json(uptodateitem);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "faile uptodated by id" }, { status: 404 });
  }
}
