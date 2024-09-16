import { defineConfig } from "cypress";
import jwt from "jsonwebtoken";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      on("task", {
        generateJwt({ payload, secret = "secret" }) {
          return jwt.sign(payload, secret, { algorithm: "HS256" });
        },
      });
    },
  },
});
