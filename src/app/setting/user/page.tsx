"use client";

import useUserContext from "@/app/context/useUserContext";
import withAuthLayout from "@/components/Layout/hoc/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const UserSetting = () => {
  // remap to forEach
  const { user: U, setUser: sU } = useUserContext();
  const [user, setUser] = useState<any>();
  const [userDetails, setUserDetails] = useState<any>();
  const [loading, setLoading] = useState<any>(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const getUserDetails = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user/${user?.id}`);

      setUserDetails(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!U.user?.id) {
      router.push("/login");
    }
  }, [U, router]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window?.sessionStorage?.getItem("user") !== "undefined"
    ) {
      const info =
        JSON.parse(window?.sessionStorage?.getItem("user") ?? "") || {};
      console.log(
        `window?.sessionStorage?.getItem("user")`,
        window?.sessionStorage?.getItem("user"),
      );
      if (info) {
        setUser(info);
      }
    }
    getUserDetails();
  }, [getUserDetails]);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      if (
        emailRef.current &&
        firstNameRef.current &&
        lastNameRef.current &&
        userDetails
      ) {
        console.log(
          emailRef.current.value,
          firstNameRef?.current.value,
          lastNameRef?.current.value,
        );
        const { data } = await axios.put(`/api/user/${user?.id}`, {
          email: emailRef.current.value,
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          // ...userDetails,
          password: userDetails?.password,
          role: userDetails?.role,
        });
        if (typeof window !== "undefined") {
          const info = window?.sessionStorage.setItem(
            "user",
            JSON.stringify(data.user),
          );
          setUser(info);
        }
        sU({
          user: data.user,
        });
        setTimeout(() => {
          toast.success("User updated");
          router.push("/");
        }, 200);

        console.log(data);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) toast.error(String(error.message));
    }
  };

  return (
    <div className="flex justify-between">
      {loading ? (
        "Loading...."
      ) : (
        <div>
          <h3>Details</h3>

          <article className="my-3">
            <div className="px-3 py-6 border border-green-500">
              <p>
                {" "}
                Name : {userDetails?.firstName} {userDetails?.lastName}{" "}
              </p>
              <p> Email : {userDetails?.email} </p>
            </div>
          </article>
        </div>
      )}

      <div>
        {loading ? (
          "Loading...."
        ) : (
          <form onSubmit={handleUpdate} className="flex flex-col gap-3">
            <label htmlFor="email">Email</label>
            <input
              ref={emailRef}
              className="p-2 my-2 border"
              name="email"
              type="email"
              id="email"
              placeholder={userDetails?.email || ""}
            />
            <label htmlFor="firstName">First name</label>
            <input
              ref={firstNameRef}
              className="p-2 my-2 border"
              type="text"
              id="firstName"
              placeholder={userDetails?.firstName || ""}
            />
            <label htmlFor="lastName">Last name</label>
            <input
              ref={lastNameRef}
              name="lastName"
              className="p-2 my-2 border"
              type="text"
              id="lastName"
              placeholder={userDetails?.lastName || ""}
            />

            <div>
              <button className="p-3 mr-10 text-white bg-green-500 rounded-sm">
                Update
              </button>
              <button className="p-3 bg-red-500 rounded-sm">
                Close Account
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default withAuthLayout(UserSetting, "setting");
