import { expect, test } from "vitest";
import * as client from "./apiClient.js";

test("read specs correctly", async () => {
  const api = await client.getInstance("");
  await api.init();
  expect(api.document.openapi).toBe("3.1.0");
});
