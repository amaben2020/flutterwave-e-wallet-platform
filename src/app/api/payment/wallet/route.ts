import { NextResponse } from "next/server";

// import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../../../prisma/index";
// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: process.env.DATABASE_URL,
//     },
//   },
// });

async function connectPrisma() {
  try {
    await prisma.$connect();
  } catch (e) {
    console.log(e);
    return Error("Unsuccessful ❌");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  const url = new URL(req.url);

  const userId = url.searchParams.get("userId") ?? "";

  console.log("USER ID", userId);

  try {
    const wallet = await prisma.wallet.findFirst({
      where: {
        userId,
      },
    });

    console.log("wallet", wallet);

    return NextResponse.json(
      { message: "Wallet retrieved ✅", wallet },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Error ❌", error }, { status: 500 });
  } finally {
    // disconnect when all is said and done
    await prisma.$disconnect();
  }
};
