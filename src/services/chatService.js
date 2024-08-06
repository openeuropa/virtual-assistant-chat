import {
  ChatMessage,
  MessageContentType,
  MessageDirection,
  MessageEvent,
  MessageStatus,
  UserTypingEvent,
} from "@chatscope/use-chat";
import { nanoid, random } from "nanoid";
import * as client from "./apiClient.js";

export class ChatService {
  constructor(storage, update, url) {
    this.storage = storage;
    this.updateState = update;
    this.url = url;

    this.eventHandlers = {
      onMessage: () => {},
      onConnectionStateChanged: () => {},
      onUserConnected: () => {},
      onUserDisconnected: () => {},
      onUserPresenceChanged: () => {},
      onUserTyping: () => {},
    };
  }

  sendMessage({ message, conversationId }) {
    const api = client.getInstance(this.url);
    api
      .init()
      .then((client) =>
        client.get("/ask", {
          params: {
            question: message.content,
          },
        }),
      )
      .then((res) => {
        const message = {
          id: nanoid(),
          content: res.data.answer,
          contentType: MessageContentType.TextHtml,
          senderId: "assistant",
          direction: MessageDirection.Incoming,
          status: MessageStatus.Sent,
          documents: res?.data?.documents ?? {},
        };
        const event = new MessageEvent({ message, conversationId });
        this.eventHandlers.onMessage(event);
      });

    return message;
  }

  sendTyping({ isTyping, content, conversationId, userId }) {}

  on(evtType, evtHandler) {
    const key = `on${evtType.charAt(0).toUpperCase()}${evtType.substring(1)}`;

    if (key in this.eventHandlers) {
      this.eventHandlers[key] = evtHandler;
    }
  }

  off(evtType) {
    const key = `on${evtType.charAt(0).toUpperCase()}${evtType.substring(1)}`;
    if (key in this.eventHandlers) {
      this.eventHandlers[key] = () => {};
    }
  }
}
