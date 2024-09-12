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
  beforeAll(() => interceptor.apply());
  afterEach(() => interceptor.removeAllListeners());

  it("should have a working getJwt() method", async () => {
    interceptor.on("request", ({ request, controller }) => {
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
