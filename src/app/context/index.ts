import { createContext } from "react";

export const userContext = createContext<{
  user: { user: Record<string, string> };
  setUser: React.Dispatch<React.SetStateAction<{}>>;
}>({
  user: {
    user: {},
  },
  setUser: () => {},
});
