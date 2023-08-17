import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  try {
    await prisma.$connect();
  } catch (e) {
    console.log(e);
    return Error("uNSUCCESsful ");
  }
}

export const GET = async (req: Request, { params: { userId } }: any) => {
  try {
    await main();

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (user) {
      return NextResponse.json({ message: "Success", user }, { status: 200 });
    }
    return NextResponse.json(
      { message: "User not found", user: {} },
      { status: 404 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    // disconnect when all is said and done
    await prisma.$disconnect();
  }
};
