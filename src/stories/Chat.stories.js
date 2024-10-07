import Chat from "@/components/Chat.jsx";

export default {
  title: "Components/Chat",
  component: Chat,
};

export const Welcome = {
  args: {
    name: "John Doe",
    width: "1000px",
    height: "90vh",
  },
};

export const Conversation = {
  args: {
    name: "John Doe",
    width: "1000px",
    height: "90vh",
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
          documents: [
            {
              language: "EN",
              title:
                "Speech by Commissioner McGuinness on 'Financing the transition – Green and Digital' at the Global Economic Summit",
              source: "Press Corner",
              source_url:
                "https://ec.europa.eu/commission/presscorner/detail/en/SPEECH_24_2805",
              source_ref: 201501,
              source_date: "2024-05-23T16:00:43+02:00",
              id: "9173a0920ffc9640d2e1a4e69af0afaa",
              content:
                "And I think the issues that are top of mind for citizens and indeed businesses are migration, cost of living, environment, shortage of workers, housing and infrastructure.\nAnd these debates are everywhere. They're heated and they're becoming increasingly very divisive.\nSo if I look back to when the European Commission launched the Green Deal in December 2019, it really did herald a very ambitious plan to make the EU economy climate neutral by 2050.\nAnd the Green Deal was for everybody, you know, from energy to housing to farming.\nAnd the push for action to address this problem of climate and environmental degradation was really strong, including from environmental groups and civil society.\nAnd I think it still is today.\nBut there is a but here.\nI think there is a change, certainly in the last year, and there's still huge awareness of the challenges that we all face and the things we need to do.\nBut there is a little pushback, about how we do it, the time frame for action and how the transition will be financed.\nI was fascinated about two thirds that know what we need to do and the one third that are different.\nBut I also have a suspicion that the two thirds who know what needs to be done, sometimes when it comes to actually doing it, also find themselves a little bit hesitant.\n",
              score: 0.81494140625,
              rating: "A",
              keywords: null,
            },
            {
              language: "EN",
              title:
                "Commission welcomes completion of key ‘Fit for 55' legislation, putting EU on track to exceed 2030 targets",
              source: "Press Corner",
              source_url:
                "https://ec.europa.eu/commission/presscorner/detail/en/IP_23_4754",
              source_ref: 197201,
              source_date: "2023-10-09T12:09:10+02:00",
              pending_review: null,
              assignee: null,
              id: "d0f4aab170a9aaa808a911b2e64ea01c",
              content:
                "The FuelEU Maritime Regulation will promote the uptake of renewable and low-carbon fuels through the establishment of a target for gradual reductions for the annual average GHG intensity of the energy used onboard by ships.\nNext steps\nThe implementation of the 'Fit for 55' legislation is now starting in the Member States. The National Energy and Climate Plans (NECPs) currently being finalised by Member States will need to integrate this new legislation and demonstrate how the 2030 climate and energy targets will be met at national level.\nAs announced by President von der Leyen in her annual State of the European Union speech, the Commission will be engaging in a series of dialogues with citizens and industry on the implementation of the European Green Deal legislation, under the guidance of Executive Vice-President Maros Šefčovič. In addition to climate legislation, development and implementation continues of the other, complementary, pillars of the European Green Deal. The European Parliament and the Council are currently negotiating several energy, circular economy, pollution and nature-related laws, with the Commission providing intensive support to make sure all these are agreed in the coming months.\nBackground\nThe European Green Deal, presented by the Commission on 11 December 2019, set out a new growth strategy for Europe. It aims to transform the EU into a fair and prosperous society, with a modern, resource-efficient and competitive economy with zero net greenhouse gas emissions by 2050 and with economic growth decoupled from resource use.\n",
              score: 0.50830078125,
              rating: "C",
              keywords: null,
            },
          ],
        },
      },
    ],
  },
};
