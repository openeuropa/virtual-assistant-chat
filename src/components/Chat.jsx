import { useAsBatchAdapter } from "@nlux/react";
import vaAvatar from "../assets/va-avatar.svg?raw";
import userAvatar from "../assets/user-avatar.svg?raw";
import { AiChat } from "@nlux/react";
import { Documents } from "./Documents.jsx";

function Chat({ url, width, height }) {
  const adapter = useAsBatchAdapter((message, extras) => {
    return fetch(`${url}/ask?question=${message}`, {
      method: "get",
    }).then((response) => response.json());
  });

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
        adapter={adapter}
      />
    </div>
  );
}

export default Chat;
