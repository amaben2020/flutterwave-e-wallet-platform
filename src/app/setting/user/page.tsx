"use client";

import withAuthLayout from "@/components/Layout/hoc/auth";
import { useEffect, useState } from "react";

const UserSetting = () => {
  // remap to forEach

  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const info = JSON.parse(window?.sessionStorage.getItem("user") || "");
      setUser(info);
    }
  }, []);
  // create update endpoint

  // close account : send a we hate to see you go message

  return (
    <div className="flex justify-between">
      <div>
        Details
        <article>
          <div className="px-3 py-6 border border-green-500">
            <p>
              {" "}
              Name : {user?.firstName} {user?.lastName}{" "}
            </p>
            <p> Email : {user?.email} </p>
          </div>
        </article>
      </div>

      <div>
        <form onSubmit={() => {}} className="flex flex-col gap-3">
          <label htmlFor="email">Email</label>
          <input
            className="p-2 my-2 border"
            name="email"
            type="email"
            placeholder={user?.email || ""}
          />
          <label htmlFor="firstName">First name</label>
          <input
            className="p-2 my-2 border"
            type="text"
            placeholder={user?.firstName || ""}
          />
          <label htmlFor="lastName">Last name</label>
          <input
            name="lastName"
            className="p-2 my-2 border"
            type="text"
            placeholder={user?.lastName || ""}
          />

          <div>
            <button className="p-3 mr-10 text-white bg-green-500 rounded-sm">
              Update
            </button>
            <button className="p-3 bg-red-500 rounded-sm">Close Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuthLayout(UserSetting, "setting");
