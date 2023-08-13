"use client";
import { Inter } from "@next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "./components/cards";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import useUserContext from "./context/useUserContext";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, setUser } = useUserContext();
  const [isActive, setIsActive] = useState(true);

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

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <main className={styles.main}>
        <Navbar />

        <div className="p-10">
          <div className="flex gap-6 my-6">
            <Card handleClick={handleIsActiveCard} isActive={isActive} />
            <Card handleClick={handleIsActiveCard} isActive={false} />
            <Card handleClick={handleIsActiveCard} isActive={false} />
          </div>
          <div>Chart</div>
          <div>Transaction</div>
          {user.user?.email}
        </div>
      </main>
    </div>
  );
}
