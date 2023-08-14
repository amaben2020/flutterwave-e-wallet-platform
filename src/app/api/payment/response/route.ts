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

export const POST = async (req: Request, res: NextResponse) => {
  const sampleResp = {
    status: "successful",
    customer: {
      name: "john doe",
      email: "user@gmail.com",
    },
    transaction_id: 4526226,
    tx_ref: "1691961249987",
    flw_ref: "FLW-MOCK-6b16158256b93415f2716dd787c93361",
    currency: "NGN",
    amount: 100,
    charged_amount: 100,
    charge_response_code: "00",
    charge_response_message: "Approved. Successful",
    created_at: "2023-08-13T21:14:51.000Z",
  };

  try {
    const data = await req.json();

    console.log("DATA LOGGED", data);

    const wallet = await prisma?.wallet.create({
      data: {
        balance: sampleResp.amount,
        userId: "64d7ed2dcc778405c8549fbf",
      },
    });

    return NextResponse.json(
      { message: "Wallet created ✅", wallet },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Error ❌", error }, { status: 500 });
  } finally {
    // disconnect when all is said and done
    await prisma.$disconnect();
  }
};

// forgot password
export const PUT = async (req: Request, res: NextResponse) => {
  await connectPrisma();

  // wallet could be updated here

  const id = req.url.split("/user/")[1];
  try {
    // get stuff from req.body
    const { firstName, lastName, email, role } = await req.json();
    const resp = await prisma.user.update({
      data: {
        firstName,
        lastName,
        email,
        role,
      },
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Successfully updated 🔌", resp },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Success", error }, { status: 500 });
  } finally {
    // disconnect when all is said and done
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request, res: NextResponse) => {
  await connectPrisma();
  try {
    const id = req.url.split("/user/")[1];

    const resp = await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Successfully deleted 🗑️", resp },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failure ❌ 🗑️", error },
      { status: 500 },
    );
  } finally {
    // disconnect when all is said and done
    await prisma.$disconnect();
  }
};
