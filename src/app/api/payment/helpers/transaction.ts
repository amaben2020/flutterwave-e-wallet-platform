// There to keep inventory of a user's  transaction(s)

import { prisma } from "../../../../../prisma/index";

type TPaymentStatus = "pending" | "successful" | "failed";

interface ITransactionDetails {
  userId: string;
  amount: number;
  name: string;
  email: string;
  currency: "NGN";
  paymentGateway: "flutterwave";
  paymentStatus: TPaymentStatus;
}

export const createTransaction = async (
  transactionDetails: ITransactionDetails,
) => {
  try {
    if (transactionDetails) {
      const transaction = await prisma.transaction.create({
        data: transactionDetails,
      });
      console.log("Created transaction ✅", transaction);
      return transaction;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌", error);
    }
  }
};
