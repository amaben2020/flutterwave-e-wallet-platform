//@ts-nocheck

import { NextResponse } from "next/server";

// import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../../../prisma/index";
import { createWalletTransaction } from "../helpers/createWalletTransaction";
import { createTransaction } from "../helpers/transaction";
import { validateAndCreateWallet } from "../helpers/validateAndCreateWallet";

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
    await connectPrisma();
    const data = await req.json();
    const getUserId = await prisma.user.findFirst({
      where: {
        email: data.customer?.email,
      },
    });

    if (!getUserId.id) {
      throw new Error("No id for this user ❌");
    }

    console.log("data", data);

    if (!data) {
      throw new Error("No data for this transaction ❌");
    }

    const transactionDetails = {
      // userId: getUserId?.id,
      amount: data?.amount,
      paymentGateway: data?.flw_ref.includes("FLW") && "flutterwave",
      currency: data?.currency,
      // name: data?.customer?.name,
      email: data?.customer?.email,
      paymentStatus: data?.charge_response_message.includes("Successful")
        ? "successful"
        : "failed",
    };

    const transaction = await createTransaction(transactionDetails);

    console.log("transaction ✅", transaction);

    const wallet = await validateAndCreateWallet(getUserId.id, {
      amount: data?.amount,
    });

    console.log("wallet", wallet);

    const walletTransaction = await createWalletTransaction(
      getUserId?.id,
      data?.amount,
      data?.charge_response_message.includes("Successful"),
      data?.flw_ref && "flutterwave",
      data?.currency,
    );

    if (transaction) {
      return NextResponse.json(
        { message: "Transaction created ✅", transaction },
        { status: 201 },
      );
    }

    if (wallet) {
      return NextResponse.json(
        { message: "Wallet created ✅", wallet },
        { status: 201 },
      );
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error ❌", error }, { status: 500 });
    }
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
