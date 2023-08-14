// create a user's wallet but first check if its not empty
// if there's something in the wallet, then update it with new transaction amount

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type TTransactionDetails = {
  amount: number;
};

export const validateAndCreateWallet = async (
  userId: string,
  transactionDetails: TTransactionDetails,
) => {
  try {
    // find wallet based on user

    const wallet = await prisma.wallet.findFirst({
      where: {
        userId,
      },
    });

    if (wallet) {
      return wallet;
    } else {
      const wallet = await prisma.wallet.create({
        data: {
          balance: transactionDetails.amount,
          user: {},
        },
      });
      console.log("Wallet validated and created ✅✅", wallet);
      return wallet;
    }

    // if no user, create a new wallet based on data or update

    //  return the wallet info
  } catch (error) {
    console.log(error);
  }
};
