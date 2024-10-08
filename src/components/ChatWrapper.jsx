import { useAuth } from "@/hooks/useAuth.js";
import { jwtDecode } from "jwt-decode";
import { useCallback } from "react";
import Chat from "@/components/Chat.jsx";

function ChatWrapper({ client, width, height }) {
  const { token, setToken } = useAuth();
  const props = {
    name: token ? jwtDecode(token).name : "",
    adapter: async (message, extras) => {
      // Decode the token to check the expiration
      const payload = jwtDecode(token);
      // Check if the token is expired (or about to expire)
      const isExpired = payload.exp * 1000 < Date.now(); // exp is in seconds, Date.now() gives milliseconds
      if (isExpired) {
        console.log("JWT Token expired, refreshing.");
        // Refresh the token if it's expired.
        const newToken = await client.getJwt();
        setToken(newToken);
        return client.ask(message, newToken);
      } else {
        return client.ask(message, token);
      }
    },
    events: {
      ready: useCallback(
        async () => setToken(await client.getJwt()),
        [setToken, client],
      ),
    },
    width,
    height,
  };

  return <Chat {...props} />;
}

export default ChatWrapper;
