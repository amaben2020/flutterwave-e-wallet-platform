import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function connectPrisma() {
  try {
    await prisma.$connect();
  } catch (e) {
    console.log(e);
    return Error("Unsuccessful ❌");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  console.log("Ran");
  try {
    await connectPrisma();
    const users = await prisma.user.findMany();

    return NextResponse.json({ message: "Success", users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Success", error }, { status: 500 });
  } finally {
    // disconnect when all is said and done
    await prisma.$disconnect();
  }
};
