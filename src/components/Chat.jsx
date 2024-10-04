import vaAvatar from "@/assets/va-avatar.svg?raw";
import userAvatar from "@/assets/user-avatar.svg?raw";
import { AiChat, useAsBatchAdapter } from "@nlux/react";
import { Documents } from "@/components/Documents.jsx";

function Chat({ name, width, height, adapter = async () => "", events = {} }) {
  return (
    <div id={"virtual-assistant"}>
      <AiChat
        composerOptions={{
          autoFocus: true,
        }}
        personaOptions={{
          assistant: {
            name: name ? `Hello ${name || "there"}!` : "Authenticating...",
            avatar: `data:image/svg+xml;base64,${btoa(vaAvatar)}`,
            tagline: "Welcome to the European Commission AI Virtual Assistant.",
          },
          user: {
            name,
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
        adapter={useAsBatchAdapter(adapter)}
        events={events}
      />
    </div>
  );
}

export default Chat;
