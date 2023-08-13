"use client";
import { Inter } from "@next/font/google";
import Card from "./components/cards";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import useUserContext from "./context/useUserContext";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, setUser } = useUserContext();
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <main className={styles.main}>
        <Navbar />

        <div className="p-10">
          <div className="flex gap-10 my-6">
            <Card />
          </div>
          <div>Chart</div>
          <div>Transaction</div>
          {user.email}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          assumenda alias minima ipsa, quaerat voluptatem eveniet optio. Ut eum
          dolor et cumque excepturi adipisci. Dolore quibusdam perspiciatis
          nihil eligendi cupiditate.
        </div>
      </main>
    </div>
  );
}
