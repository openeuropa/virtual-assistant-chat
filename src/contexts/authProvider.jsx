import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import AuthContext from "./authContext.js";

const AuthProvider = ({ children }) => {
  // State to hold the authentication token, initialized from localStorage.
  // If a token exists in localStorage, it's set as the initial state.
  const [token, setStateToken] = useState(localStorage.getItem("token"));

  // Custom function to update the token state.
  // This function is used to abstract away the state setter and can include additional logic if needed.
  const setToken = (newToken) => {
    setStateToken(newToken);
  };

  // useEffect hook to synchronize the token with Axios headers and localStorage.
  // Runs whenever the 'token' state changes.
  useEffect(
    () => {
      if (token) {
        // If token exists, set the Authorization header for all axios requests.
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        // Also store the token in localStorage for persistence across reloads.
        localStorage.setItem("token", token);
      } else {
        // If token is null or empty, remove the Authorization header.
        delete axios.defaults.headers.common["Authorization"];

        // Remove the token from localStorage.
        localStorage.removeItem("token");
      }
    },
    // Re-run this effect only when 'token' changes.
    [token],
  );

  // Memoize the authentication context value to optimize performance.
  // This prevents unnecessary re-renders when the context is passed to consumers.
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    // Recompute the memoized value only when 'token' changes.
    [token],
  );

  // Provide the authentication context to any child components.
  // This makes the token and setToken available to any component wrapped in AuthProvider.
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
