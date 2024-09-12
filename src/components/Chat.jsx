import vaAvatar from "../assets/va-avatar.svg?raw";
import userAvatar from "../assets/user-avatar.svg?raw";
import { useAsBatchAdapter } from "@nlux/react";
import { AiChat } from "@nlux/react";
import { Documents } from "./Documents.jsx";
import { useCallback } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { jwtDecode } from "jwt-decode";

function Chat({ client, width, height }) {
  const { token, setToken } = useAuth();
  return (
    <div id={"virtual-assistant"}>
      <AiChat
        composerOptions={{
          autoFocus: true,
        }}
        personaOptions={{
          assistant: {
            name: "AI Virtual Assistant",
            avatar: `data:image/svg+xml;base64,${btoa(vaAvatar)}`,
            tagline: "Welcome to the European Commission AI Virtual Assistant.",
          },
          user: {
            name: "User",
            avatar: `data:image/svg+xml;base64,${btoa(userAvatar)}`,
          },
        }}
        messageOptions={{
          responseRenderer: ({ content }) => (
            <>
              {content[0].answer}
              {content[0].documents && (
                <Documents documents={content[0].documents} />
              )}
            </>
          ),
        }}
        displayOptions={{
          themeId: "nova",
          colorScheme: "light",
          width,
          height,
        }}
        adapter={useAsBatchAdapter(async (message, extras) => {
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
        })}
        events={{
          ready: useCallback(
            async () => setToken(await client.getJwt()),
            [setToken, client],
          ),
        }}
      />
    </div>
  );
}

export default Chat;
