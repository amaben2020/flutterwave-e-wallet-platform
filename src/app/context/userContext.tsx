import React, { useState } from "react";
import { userContext } from ".";

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({});

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
