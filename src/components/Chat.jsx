import vaAvatar from "../assets/va-avatar.svg?raw";
import userAvatar from "../assets/user-avatar.svg?raw";
import { useAsBatchAdapter } from "@nlux/react";
import { AiChat } from "@nlux/react";
import { Documents } from "./Documents.jsx";
import { useCallback } from "react";
import { useAuth } from "../hooks/useAuth.js";

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
        adapter={useAsBatchAdapter((message, extras) => {
          return client.ask(message, token);
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
