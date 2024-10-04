import { useContext } from "react";
import AuthContext from "@/contexts/authContext.js";

// Custom hook to make it easier to access the AuthContext from other components.
// Instead of manually calling useContext(AuthContext), components can just use useAuth().
export const useAuth = () => {
  return useContext(AuthContext);
};
