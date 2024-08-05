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
  constructor(storage, update) {
    this.storage = storage;
    this.updateState = update;

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
    // @todo: remove hardcoded service URL.
    const api = client.getInstance("http://127.0.0.1:5000");
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
        const answer = new ChatMessage({
          id: nanoid(),
          content: res.data.answer,
          contentType: MessageContentType.TextHtml,
          senderId: "assistant",
          direction: MessageDirection.Incoming,
          status: MessageStatus.Sent,
        });
        const event = new MessageEvent({ message: answer, conversationId });
        this.eventHandlers.onMessage(event);
      });

    return message;
  }

  sendTyping({ isTyping, content, conversationId, userId }) {
    // We send the "typing" signalization using a CustomEvent dispatched to the window object.
    // It is received in the callback assigned in the constructor
    // In a real application, instead of dispatching the event here,
    // you will implement sending signalization to your chat server.
    const typingEvent = new CustomEvent("chat-protocol", {
      detail: {
        type: "typing",
        isTyping,
        content,
        conversationId,
        userId,
        sender: this,
      },
    });

    window.dispatchEvent(typingEvent);
  }

  // The ChatProvider registers callbacks with the service.
  // These callbacks are necessary to notify the provider of the changes.
  // For example, when your service receives a message, you need to run an onMessage callback,
  // because the provider must know that the new message arrived.
  // Here you need to implement callback registration in your service.
  // You can do it in any way you like. It's important that you will have access to it elsewhere in the service.
  on(evtType, evtHandler) {
    const key = `on${evtType.charAt(0).toUpperCase()}${evtType.substring(1)}`;

    if (key in this.eventHandlers) {
      this.eventHandlers[key] = evtHandler;
    }
  }

  // The ChatProvider can unregister the callback.
  // In this case remove it from your service to keep it clean.
  off(evtType) {
    const key = `on${evtType.charAt(0).toUpperCase()}${evtType.substring(1)}`;
    if (key in this.eventHandlers) {
      this.eventHandlers[key] = () => {};
    }
  }
}
