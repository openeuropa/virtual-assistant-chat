import "./styles/main.scss";
import "@nlux/themes/nova.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useAsBatchAdapter } from "@nlux/react";
import vaAvatar from "./assets/va-avatar.svg";
import { AiChat } from "@nlux/react";
import { Documents } from "./components/Documents.jsx";

function App({ url = {}, maxMessages = 100 }) {
  TimeAgo.addDefaultLocale(en);
  const adapter = useAsBatchAdapter((message, extras) => {
    return fetch(`${url}/ask?question=${message}`, {
      method: "get",
    }).then((response) => response.json());
  });

  return (
    <AiChat
      composerOptions={{
        autoFocus: true,
      }}
      personaOptions={{
        assistant: {
          name: "AI Virtual Assistant",
          avatar: vaAvatar,
          tagline: "Welcome to the European Commission AI Virtual Assistant.",
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
      displayOptions={{ themeId: "nova", colorScheme: "light" }}
      adapter={adapter}
    />
  );
}

export default App;
