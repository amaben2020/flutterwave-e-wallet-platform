"use client";

import withAuthLayout from "@/components/Layout/hoc/auth";
import { useRef } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const registerUser = async (e: any) => {
    e.preventDefault();
    try {
      if (emailRef.current && passwordRef.current) {
        console.log("emailRef?.current?.value", emailRef?.current?.value);
        console.log("passwordRef?.current?.value", passwordRef?.current?.value);
        const { data } = await fetch(
          "http://localhost:3000/api/user/register",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailRef?.current?.value,
              password: passwordRef?.current?.value,
            }),
          },
        );
        toast("Successfully registered");
        console.log("data", data);
      }
    } catch (error) {
      toast(error);
      console.log("Error", error);
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

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Remember me
          </label>
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

export default withAuthLayout(Register, "register");
