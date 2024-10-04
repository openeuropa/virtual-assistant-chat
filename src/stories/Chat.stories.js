import Chat from "@/components/Chat.jsx";

export default {
  title: "Components/Chat",
  component: Chat,
};

export const Welcome = {
  args: {
    name: "John Doe",
    width: "700px",
    height: "700px",
  },
};

export const Conversation = {
  args: {
    name: "John Doe",
    width: "700px",
    height: "700px",
    initialConversation: [
      {
        role: "user",
        message:
          "Hi, I'm curious about the EU. What is its purpose? I hear it's more than just a union. Can you explain?",
      },
      {
        role: "assistant",
        message: {
          answer:
            "The EU promotes peace, stability, and economic cooperation among its members. It helps coordinate trade among 27 countries, enabling free movement of goods and people. Additionally, the EU establishes common laws and standards, fostering a unified approach to global challenges like climate change and security.",
        },
      },
      {
        role: "user",
        message: "Interesting! How does it work politically?",
      },
      {
        role: "assistant",
        message: {
          answer:
            "The EU's decisions are made by key institutions like the European Commission, European Parliament, and the Council of the European Union. The European Parliament represents the citizens, while the Council represents national governments. Each country has a voice, though larger states hold more influence in some areas.",
        },
      },
      {
        role: "user",
        message:
          "What about the Euro? Does every country use it? How does that affect their economies? Can they opt-out?",
      },
      {
        role: "assistant",
        message: {
          answer:
            "Not all EU countries use the Euro; 20 out of 27 have adopted it. Some, like Denmark, have opted out, while others are still transitioning. The Euro simplifies trade between participating countries, but it also means shared monetary policies, which can be challenging for economically diverse members.",
        },
      },
    ],
  },
};
