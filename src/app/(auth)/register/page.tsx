//@ts-nocheck
"use client";

import useUserContext from "@/app/context/useUserContext";
import withAuthLayout from "@/components/Layout/hoc/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
const Register = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (user?.email) {
      router.push("/login");
    }
  }, [router, user.email]);

  const registerUser = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (
        emailRef.current &&
        passwordRef.current &&
        firstNameRef.current &&
        lastNameRef.current
      ) {
        const data = await fetch(`http://localhost:3000/api/user/register`, {
          method: "POST",
          body: JSON.stringify({
            email: emailRef.current?.value,
            password: passwordRef?.current?.value,
            firstName: firstNameRef?.current?.value,
            lastName: lastNameRef?.current?.value,
            role: "ADMIN",
          }),
        });

        const {
          resp: { email, firstName, lastName, role, password },
        } = await data.json();
        setUser({ email, firstName, lastName, role, password });
        toast.success(` ${email} Successfully registered`);
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.stack?.includes("email") && "Email already in use");
      }

      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={registerUser}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            ref={emailRef}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-4"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Firstname
          </label>
          <input
            type="text"
            ref={firstNameRef}
            id="firstName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-4"
            placeholder="first name"
            required
          />
        </div>{" "}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your lastname
          </label>
          <input
            type="text"
            ref={lastNameRef}
            id="last name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-4"
            placeholder="lastname"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-4"
            placeholder="123456"
            required
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default withAuthLayout(Register, "register");
