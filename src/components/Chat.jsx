import vaAvatar from "@/assets/va-avatar.svg?raw";
import userAvatar from "@/assets/user-avatar.svg?raw";
import { AiChat, useAsBatchAdapter } from "@nlux/react";
import { Documents } from "@/components/Documents.jsx";

function Chat({
  name,
  width,
  height,
  adapter = async () => "",
  events = {},
  initialConversation = null,
}) {
  const tagline = name
    ? `Hello ${name || "there"}, You are now connected!`
    : "Authenticating...";
  return (
    <div id={"virtual-assistant"}>
      <AiChat
        composerOptions={{
          autoFocus: true,
        }}
        personaOptions={{
          assistant: {
            name: "Welcome to the European Commission AI Virtual Assistant!",
            avatar: `data:image/svg+xml;base64,${btoa(vaAvatar)}`,
            tagline,
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
        initialConversation={initialConversation}
      />
    </div>
  );
}

export default Chat;
