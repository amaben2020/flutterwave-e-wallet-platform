//@ts-nocheck
"use client";

import useUserContext from "@/app/context/useUserContext";
import withAuthLayout from "@/components/Layout/hoc/auth";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const { user, setUser } = useUserContext();

  const [cookie, setCookie] = useCookies(["user"]);

  const loginUser = async (e: any) => {
    e.preventDefault();
    try {
      if (emailRef.current && passwordRef.current) {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/user/login`,
          {
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value,
          },
        );
        setCookie("user", JSON.stringify(data), {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });
        toast.success("Successfully logged in");
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      console.log("Error", error);
    }
  };

  return (
    <>
      <form onSubmit={loginUser}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            value={user.email ?? null}
            ref={emailRef}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-4"
            placeholder="name@flowbite.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            ref={passwordRef}
            value={user.password ?? null}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-4"
            placeholder="123456"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>

        <Link href="/forgot-password"> Forgot Password?</Link>
      </form>
    </>
  );
};

export default withAuthLayout(Login, "login");
