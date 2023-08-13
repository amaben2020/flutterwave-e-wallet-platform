import { useContext } from "react";
import { userContext } from ".";

const useUserContext = () => {
  const { user, setUser } = useContext(userContext);
  return { user, setUser };
};

export default useUserContext;
