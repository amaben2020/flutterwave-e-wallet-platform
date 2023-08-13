import { createContext } from "react";

export const userContext = createContext<{
  user: Record<string, string>;
  setUser: React.Dispatch<React.SetStateAction<{}>>;
}>({ user: {}, setUser: () => {} });
