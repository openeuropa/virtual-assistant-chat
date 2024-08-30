import "./styles/main.scss";
import vaAvatar from "./assets/va-avatar.svg";
import {
  BasicStorage,
  ChatProvider,
  Conversation,
  ConversationRole,
  Participant,
  Presence,
  TypingUsersList,
  User,
  UserStatus,
} from "@chatscope/use-chat";
import { nanoid } from "nanoid";
import { AutoDraft } from "@chatscope/use-chat/dist/enums/AutoDraft";
import { ChatService } from "./services/chatService.js";
import { Chat } from "./Chat.jsx";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

function App({ url, style = {}, maxMessages = 100 }) {
  TimeAgo.addDefaultLocale(en);

  const messageIdGenerator = () => nanoid();
  const groupIdGenerator = () => nanoid();

  const storage = new BasicStorage({ groupIdGenerator, messageIdGenerator });

  // Create serviceFactory
  const serviceFactory = (storage, updateState) => {
    return new ChatService(storage, updateState, url);
  };

  const defaultUser = new User({
    id: "Me",
    presence: new Presence({ status: UserStatus.Available, description: "" }),
    username: "Me",
  });

  function createConversation(id, name) {
    return new Conversation({
      id,
      participants: [
        new Participant({
          id: name,
          role: new ConversationRole([]),
        }),
      ],
      unreadCounter: 0,
      typingUsers: new TypingUsersList({ items: [] }),
      draft: "",
    });
  }

  const assistantName = "Virtual Assistant";
  storage.addUser(
    new User({
      id: assistantName,
      presence: new Presence({
        status: UserStatus.Unavailable,
        description: "",
      }),
      username: assistantName,
      avatar: vaAvatar,
    }),
  );

  const conversationId = nanoid();
  storage.addConversation(createConversation(conversationId, assistantName));
  storage.setActiveConversation(conversationId);

  return (
    <div style={style}>
      <ChatProvider
        serviceFactory={serviceFactory}
        storage={storage}
        config={{
          typingThrottleTime: 250,
          typingDebounceTime: 900,
          debounceTyping: true,
          autoDraft: AutoDraft.Save | AutoDraft.Restore,
        }}
      >
        <Chat user={defaultUser} maxMessages={maxMessages} />
      </ChatProvider>
    </div>
  );
}

export default App;
