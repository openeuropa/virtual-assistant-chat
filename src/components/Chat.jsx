import vaAvatar from "@/assets/va-avatar.svg?raw";
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
    <div
      id={"virtual-assistant"}
      className="nlux-chatRoom-wrapper"
      style={{ width, height }}
    >
      <AiChat
        composerOptions={{
          autoFocus: true,
          placeholder: "Type your prompt here...",
        }}
        personaOptions={{
          assistant: {
            name: "Welcome to the European Commission AI Virtual Assistant!",
            avatar: `data:image/svg+xml;base64,${btoa(vaAvatar)}`,
            tagline,
          },
          user: {
            name,
            avatar: (
              <div className="nlux-chat-avatar-user">
                {name ? name.charAt(0).toUpperCase() : "U"}
              </div>
            ),
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
          height,
        }}
        adapter={useAsBatchAdapter(adapter)}
        events={events}
        initialConversation={initialConversation}
      />
      <div className="nlux-disclaimer">
        Chats aren’t used to train our models. The virtual assistant can make
        mistakes.
      </div>
    </div>
  );
}

export default Chat;
