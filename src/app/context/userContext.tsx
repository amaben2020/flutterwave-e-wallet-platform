import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { userContext } from ".";

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({});

  const [{ user: userInCookie }, _] = useCookies(["user"]);

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
