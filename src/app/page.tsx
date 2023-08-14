"use client";
import { Inter } from "@next/font/google";
import axios from "axios";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "./components/cards";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import useUserContext from "./context/useUserContext";
import styles from "./page.module.css";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, setUser } = useUserContext();
  const [balance, setBalance] = useState(0);
  const [isActive, setIsActive] = useState(true);

  console.log(user);

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY ?? "",
    tx_ref: String(Date.now()),
    amount: 1000,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user?.user?.email || "",
      phone_number: "070********",
      name: `${user?.user?.firstName} ${user?.user?.lastName}`,
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleIsActiveCard = () =>
    setIsActive((previousState) => !previousState);

  const router = useRouter();

  useEffect(() => {
    if (user.user?.email && user.user?.firstName) {
      console.log("yeah");
    } else {
      router.push("/login");
    }
  }, [router, user.user?.email, user.user?.firstName]);

  const handleResponse = async (response: any) => {
    try {
      const wallet = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/response`,
        response,
      );
      console.log("Wallet", wallet);
      if (wallet.data.status === 200 && wallet.data.wallet) {
        toast.success(wallet.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBalanceFetch = useCallback(async () => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/wallet?userId=${user?.user?.id}`,
      );
      console.log("Balance", data.data);
      setBalance(data.data.wallet.balance);
    } catch (error) {
      console.log("Error", error);
    }
  }, [user?.user?.id]);

  useEffect(() => {
    handleBalanceFetch();
  }, [handleBalanceFetch]);

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <main className={styles.main}>
        <Navbar />

        <div className="p-10">
          <div className="flex gap-6 my-6">
            <Card
              handleClick={handleIsActiveCard}
              balance={balance}
              isActive={isActive}
            />
            <Card
              balance={balance}
              handleClick={handleIsActiveCard}
              isActive={false}
            />
            <Card
              balance={balance}
              handleClick={handleIsActiveCard}
              isActive={false}
            />
          </div>
          <div>Chart</div>
          <div>Transaction</div>
          {user.user?.email}

          <button
            className="p-3 mx-10 text-white bg-green-600 border"
            onClick={() => {
              handleFlutterPayment({
                callback: async (response) => {
                  console.log(response);
                  await handleResponse(response);
                  closePaymentModal();
                },
                onClose: () => {},
              });
            }}
          >
            Payment with React hooks
          </button>
        </div>
      </main>
    </div>
  );
}
