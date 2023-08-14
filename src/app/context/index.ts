import { createContext } from "react";

export const userContext = createContext<{
  user: {
    user?: {
      email: string;
      firstName: string;
      lastName: string;
      id: string;
    };
  };
  setUser: React.Dispatch<React.SetStateAction<{}>>;
}>({
  user: {
    user: {
      email: "",
      firstName: "",
      lastName: "",
      id: "",
    },
  },
  setUser: () => {},
});
