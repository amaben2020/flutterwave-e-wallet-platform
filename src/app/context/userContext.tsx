import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { userContext } from ".";

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>({});

  const [{ user: userInCookie }, _] = useCookies(["user"]);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      if (typeof window !== "undefined") {
        setUser(JSON.parse(window?.sessionStorage.getItem("user") || ""));
      }
    }
  }, [user, router]);

  useEffect(() => {
    if (userInCookie) {
      setUser(userInCookie);
    }
  }, [userInCookie]);

  const { Provider } = userContext;

  return (
    <Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </Provider>
  );
};

export default UserContext;
