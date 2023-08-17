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

export const PUT = async (req: Response, res: NextResponse) => {
  connectPrisma();

  const body = await req.json();
  const url = new URL(req.url);

  const id = url.searchParams.get("id") ?? "";

  try {
    const userInfo = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: body?.password,
      },
    });
    return NextResponse.json(
      { message: "Password updated successfully ✅", user: userInfo },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
};
