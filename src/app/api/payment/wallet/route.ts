import { NextResponse } from "next/server";

import { prisma } from "../../../../../prisma/index";
import { createWallet } from "../helpers/createWallet";

async function connectPrisma() {
  try {
    await prisma.$connect();
  } catch (e) {
    console.log(e);
    return Error("Unsuccessful ❌");
  }
}

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { amount, userId } = await req.json();

    const data = await createWallet(userId, amount);
    console.log("data", data);

    NextResponse.json({ wallet: data });
  } catch (error) {
    console.log(error);
  }
};

export const GET = async (req: Request, res: NextResponse) => {
  const url = new URL(req.url);

  const userId = url.searchParams.get("userId") ?? "";

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
