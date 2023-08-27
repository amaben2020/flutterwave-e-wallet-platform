"use client";
import { Inter } from "@next/font/google";
import axios from "axios";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "./components/cards";
import LottieControl from "./components/loading";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Table from "./components/table";
import useUserContext from "./context/useUserContext";
import styles from "./page.module.css";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, setUser } = useUserContext();
  const [userInDB, setUserInDB] = useState(null);
  const [userTransactions, setUserTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const router = useRouter();
  const getUserFromDb = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/user/${user.user?.id}`);
      setUserInDB(data?.user);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [user.user?.id]);

  const getUserTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/payment/transaction?email=${user.user?.email}`,
      );
      setUserTransactions(data.transaction);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [user.user?.email]);

  useEffect(() => {
    if (!user.user?.id && !isLoading) {
      router.push("/login");
    }
  }, [user.user?.id, router, isLoading]);

  useEffect(() => {
    getUserFromDb();
    getUserTransactions();
  }, [getUserFromDb, getUserTransactions]);
  useEffect(() => {
    if (user.user?.email && user.user?.firstName && !isLoading) {
      toast.success(`Welcome ${user.user?.firstName}`);
    } else if (!isLoading && !user.user?.id && userInDB) {
      setTimeout(() => {
        router.push("/login");
      }, 200);
    }
  }, [
    router,
    user.user?.email,
    user.user?.firstName,
    userInDB,
    isLoading,
    user.user?.id,
  ]);

  useEffect(() => {
    if (!userInDB && isLoading) {
      console.log("LOADING ❌");

      // use a full page loading spinner
    }

    if (!userInDB && !isLoading) {
      console.log("PUSH TO REGISTER ✅ ");
    }
  }, [userInDB, router, isLoading]);
  const [selectedProduct, setSelectedProduct] = useState({ price: 0 });

  console.log("selectedProduct?.price", selectedProduct?.price);

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY ?? "",
    tx_ref: String(Date.now()),
    amount: selectedProduct?.price,
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

  const handleFetchWallet = async () => {
    try {
      const data = await axios.get(
        `/api/payment/wallet?userId=${user.user?.id}`,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleFlutterPayment = useFlutterwave(config);
  console.log("userTransactions", userTransactions);

  const totalTransactions = userTransactions.reduce(
    (acc, cv: Record<string, string | number>) => {
      if (typeof cv.amount === "number") acc += cv.amount;

      return acc;
    },
    0,
  );

  const handleIsActiveCard = () =>
    setIsActive((previousState) => !previousState);

  const handleResponse = async (response: any) => {
    try {
      const wallet = await axios.post(`/api/payment/response`, response);
      console.log("Wallet", wallet);
      if (wallet.data.status === 200 && wallet.data.wallet) {
        toast.success(wallet.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("added");
    }
  };

  const handleBalanceFetch = useCallback(async () => {
    try {
      const data = await axios.get(
        `/api/payment/wallet?userId=${user?.user?.id}`,
      );

      setBalance(data.data.wallet.balance);
    } catch (error) {
      console.log("Error", error);
    }
  }, [user?.user?.id]);

  useEffect(() => {
    handleBalanceFetch();
  }, [handleBalanceFetch]);

  const [products, setProducts] = useState([
    { id: 1, name: "Keyboard", price: 4440, category: "Accessories" },
    { id: 2, name: "Mouse", price: 25550, category: "Accessories" },
    { id: 3, name: "Monitor", price: 399, category: "Accessories" },
    { id: 4, name: "Dell XPS", price: 599, category: "Laptop" },
    { id: 5, name: "MacBook Pro", price: 899, category: "Laptop" },
    { id: 6, name: "Pencil Box", price: 6222, category: "Stationary" },
    { id: 7, name: "Pen", price: 20000, category: "Stationary" },
    { id: 8, name: "USB Cable", price: 7, category: "Accessories" },
    { id: 9, name: "Eraser", price: 20000, category: "Stationary" },
    { id: 10, name: "Highlighter", price: 500000, category: "Stationary" },
  ]);

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
              isLoading={isLoading}
            />
            <Card
              transaction
              balance={totalTransactions}
              handleClick={handleIsActiveCard}
              isActive={false}
              isLoading={isLoading}
            />
            <Card
              balance={balance}
              handleClick={handleIsActiveCard}
              isActive={false}
              isLoading={isLoading}
            />
          </div>
          <div>Chart</div>
          <div>
            <h2>Transactions</h2>

            {userTransactions && (
              <Table transactions={userTransactions || []} />
            )}
          </div>

          {isLoading ? <LottieControl /> : user.user?.email}
          <div className="flex flex-wrap gap-6">
            {products.map((p) => {
              return (
                <div className="p-6 border" key={p.id}>
                  {p.name}
                  {p.category}
                  {p.price}

                  <button
                    className="p-3 mx-10 text-white bg-green-600 border"
                    onClick={() => {
                      setSelectedProduct({ price: p.price });
                      if (selectedProduct.price > 0) {
                        handleFlutterPayment({
                          callback: async (response) => {
                            await handleResponse(response);
                            closePaymentModal();
                          },
                          onClose: () => {
                            toast.warning("Payment Complete");
                          },
                        });
                      }
                    }}
                  >
                    Pay
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
