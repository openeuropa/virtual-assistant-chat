import { expect, describe, it, afterEach, beforeEach } from "vitest";
import createClient from "@/services/client.js";
import { BatchInterceptor } from "@mswjs/interceptors";
import nodeInterceptors from "@mswjs/interceptors/presets/node";
import jwt from "jsonwebtoken";

// Set up interceptor.
const interceptor = new BatchInterceptor({
  interceptors: nodeInterceptors,
});

// Set up client.
const client = createClient("http://localhost/backend", "http://localhost/jwt");

beforeEach(() => {
  // Any unhandled exception will NOT be coerced to a 500 error response.
  // This allows to run expect() assertions in the interceptor's event handlers.
  interceptor.on("unhandledException", ({ error }) => {
    throw error;
  });
  interceptor.apply();
});
afterEach(() => interceptor.removeAllListeners());

describe("The client.getJwt() method", async () => {
  it("should produce a well-formed request", async () => {
    interceptor.on("request", ({ request, controller }) => {
      // Assert request to be well-formed.
      expect(request.url).toEqual("http://localhost/jwt");
      expect(request.method).toEqual("GET");
      expect(request.headers.get("Accept")).toEqual("application/json");

      // Return a valid response not to have an error thrown by the method.
      controller.respondWith(
        new Response(
          JSON.stringify({
            token: jwt.sign({}, "secret", { algorithm: "HS256" }),
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
      );
    });

    // Run method to produce request.
    await client.getJwt();
  });

  it("should return the token payload, on a successful request", async () => {
    interceptor.on("request", ({ request, controller }) => {
      const payload = {
        iat: 1726136574,
        exp: 1726140174,
        sub: "admin@example.org",
        iss: "http://localhost:8080",
      };
      const token = jwt.sign(payload, "secret", { algorithm: "HS256" });

      controller.respondWith(
        new Response(JSON.stringify({ token }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );
    });

    const token = await client.getJwt();
    expect(token).toEqual(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjYxMzY1NzQsImV4cCI6MTcyNjE0MDE3NCwic3ViIjoiYWRtaW5AZXhhbXBsZS5vcmciLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAifQ.-fDru8D1A39AtiCCPxUaMrG9xOKtCO-eftIb0vk2H5c",
    );
  });
});

describe("The client.ask() method", async () => {
  it("should produce a well-formed request and return the response content", async () => {
    interceptor.on("request", ({ request, controller }) => {
      // Assert request to be well-formed.
      expect(request.url).toEqual(
        "http://localhost/backend/ask?question=Here%20is%20my%20question%3A%20how%20would%20you%20encode%20these%20%22%26%22%2C%20%22%3F%22%3F",
      );
      expect(request.method).toEqual("GET");
      expect(request.headers.get("Authorization")).toEqual("Bearer 123");

      // Return a valid response not to have an error thrown by the method.
      controller.respondWith(
        new Response(JSON.stringify({ foo: "bar" }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );
    });

    // Run method to produce request.
    const content = await client.ask(
      'Here is my question: how would you encode these "&", "?"?',
      "123",
    );
    expect(content).toEqual({ foo: "bar" });
  });
});
