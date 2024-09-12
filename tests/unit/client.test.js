import { expect, describe, it, afterEach, beforeAll } from "vitest";
import createClient from "@/services/client.js";
import { BatchInterceptor } from "@mswjs/interceptors";
import nodeInterceptors from "@mswjs/interceptors/presets/node";
import jwt from "jsonwebtoken";

// Set up interceptor.
const interceptor = new BatchInterceptor({
  name: "my-interceptor",
  interceptors: nodeInterceptors,
});

describe("The client", async () => {
  beforeAll(() => {
    // Any unhandled exception will NOT be coerced to a 500 error response.
    // This allows to run expect() assertions in the interceptor's event handlers.
    interceptor.on("unhandledException", ({ error }) => {
      throw error;
    });
    interceptor.apply();
  });
  afterEach(() => interceptor.removeAllListeners());

  it("should have a working getJwt() method", async () => {
    interceptor.on("request", ({ request, controller }) => {
      // Assert request to be well-formed.
      expect(request.url).toEqual("http://localhost/jwt");
      expect(request.method).toEqual("GET");
      expect(request.headers.get("Accept")).toEqual("application/json");

      const payload = {
        iat: 1726136574,
        exp: 1726140174,
        sub: "admin@example.org",
        iss: "http://localhost:8080",
      };
      const secret = "secret";
      const token = jwt.sign(payload, secret, { algorithm: "HS256" });

      controller.respondWith(
        new Response(JSON.stringify({ token }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );
    });

    const client = createClient(
      "http://localhost/backend",
      "http://localhost/jwt",
    );
    const payload = await client.getJwt();
    expect(payload).toEqual({
      iat: 1726136574,
      exp: 1726140174,
      sub: "admin@example.org",
      iss: "http://localhost:8080",
    });
  });
});
