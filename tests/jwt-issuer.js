/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import express from "express";
import cors from "cors";

const app = express();

// Allow CORS for all origins
app.use(cors());

// Load secret from environment variable or default to '123'
const PORT = 8088;
const JWT_SECRET = process.env.JWT_SECRET || "123";
const JWT_ISS = process.env.JWT_ISS || `http://localhost:${PORT}`;
const JWT_EXP = parseInt(process.env.JWT_EXP) || 10;

// Route to issue JWT
app.get("/token", (req, res) => {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const token = jwt.sign(
    {
      iat: now,
      exp: now + JWT_EXP,
      name: "John Doe",
      sub: "admin@example.org",
      iss: JWT_ISS,
    },
    JWT_SECRET,
    { algorithm: "HS256" },
  );

  res.json({ token });
});

// Start the server
app.listen(PORT, () => {
  console.log(`JWT service running on http://localhost:${PORT}`);
});
