import { useMemo, useState } from "react";
import AuthContext from "./authContext.js";
import { jwtDecode } from "jwt-decode";

const AuthProvider = ({ children }) => {
  // State to hold the authentication token.
  const [token, setStateToken] = useState("");

  // Custom function to update the token state.
  // This function is used to abstract away the state setter and can include additional logic if needed.
  const setToken = (newToken) => {
    console.log("Setting token", {
      old: token,
      new: newToken,
      newPayload: jwtDecode(newToken),
    });
    setStateToken(newToken);
  };

  // Memoize the authentication context value to optimize performance.
  // This prevents unnecessary re-renders when the context is passed to consumers.
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    // Recompute the memoized value only when 'token' changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token],
  );

  // Provide the authentication context to any child components.
  // This makes the token and setToken available to any component wrapped in AuthProvider.
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
