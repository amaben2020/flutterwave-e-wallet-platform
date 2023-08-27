import { prisma } from "../../../../../prisma/index";
export const createWallet = async (userId: string, amount: number) => {
  try {
    await prisma.wallet.create({
      data: {
        userId,
        balance: amount,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
