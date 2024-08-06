import { Documents } from "../components/Documents.jsx";

export default {
  title: "Chat/Documents",
  component: Documents,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};

export const Default = {
  args: {
    user: {
      name: "Jane Doe",
    },
  },
};
