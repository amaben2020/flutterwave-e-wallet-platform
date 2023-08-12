import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
  } catch (e) {
    console.log(e);
    return Error("uNSUCCESsful ");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();

    const emp = await prisma.employees.findMany();
    return NextResponse.json({ message: "Success", emp }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Success", error }, { status: 500 });
  } finally {
    // disconnect when all is said and done
    await prisma.$disconnect();
  }
};
export const POST = async (req: Request, res: NextResponse) => {
  try {
    // get stuff from req.body
    const { Firstname, Surname, Email } = await req.json();
    const resp = await prisma.employees.create({
      data: {
        Firstname,
        Surname,
        Email,
      },
    });
    console.log("POST");
    return NextResponse.json({ message: "Success", resp }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Success", error }, { status: 500 });
  } finally {
    // disconnect when all is said and done
    await prisma.$disconnect();
  }
};
