//@ts-nocheck
"use client";

import useUserContext from "@/app/context/useUserContext";
import withAuthLayout from "@/components/Layout/hoc/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
const ForgotPassword = () => {
  // if user doesn't know the password, enable them update it via email

  // user uses email to search for model

  // we find and update the password and redirect to login

  // this enables us test the new password with a successful email sent to user

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const { user, setUser } = useUserContext();
  const [userInApp, setUserInApp] = useState(null);

  const [cookie, setCookie] = useCookies(["user"]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userInfo = window.sessionStorage.getItem(
        "user",
        JSON.stringify(user?.user),
      );
      console.log("userInformation", userInfo);
      setUserInApp(JSON.parse(userInfo));
    }
  }, [user?.user]);

  const updatePasswordAndRedirect = async (e: any) => {
    e.preventDefault();
    try {
      if (passwordRef.current) {
        const data = await axios.put(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/user/forgot-password?id=${userInApp?.id}`,
          {
            password: passwordRef?.current?.value,
          },
        );

        console.log("data", data);

        if (
          data.statusText === "Created" &&
          data.data.message.includes("successfully")
        ) {
          router.push("/login");
        }
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
      <form onSubmit={updatePasswordAndRedirect}>
        Hi, {user.user?.firstName ?? userInApp?.firstName} forgot your password?
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Enter new password
          </label>
          <input
            ref={passwordRef}
            // value={userInApp.password ?? null}
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
      </form>
    </>
  );
};

export default withAuthLayout(ForgotPassword, "Forgot Password");
