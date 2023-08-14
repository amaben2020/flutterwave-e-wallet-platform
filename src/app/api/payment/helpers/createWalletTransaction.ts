// There to keep inventory of a user's wallet transaction(s)

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createWalletTransaction = async (
  userId: string,
  amount: number,
  isInflow: boolean,
  paymentGateway: "flutterwave",
  currency: any,
) => {
  console.log("USER ID", userId);
  try {
    const wallet = await prisma.walletTransaction.create({
      data: {
        userId,
        amount,
        isInflow,
        paymentGateway,
        currency,
      },
    });
    console.log("Create transaction wallet ✅", wallet);
    return wallet;
  } catch (error) {
    console.log("❌", error);
  }
};
