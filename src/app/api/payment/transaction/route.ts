import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function connectPrisma() {
  try {
    await prisma.$connect();
  } catch (e) {
    console.log(e);
    return Error("Unsuccessful ❌");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  console.log("called");
  // await connectPrisma();
  const url = new URL(req.url);
  console.log(url);
  const email = url.searchParams.get("email") ?? "";

  console.log("USER ID", email);

  try {
    const transaction = await prisma.transaction.findMany({
      where: {
        email,
      },
    });
    console.log("transaction", transaction);
    return NextResponse.json(
      { message: "transaction retrieved ✅", transaction },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Error ❌", error }, { status: 500 });
  } finally {
    // disconnect when all is said and done
    await prisma.$disconnect();
  }
};
