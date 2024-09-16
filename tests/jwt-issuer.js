import jwt from "jsonwebtoken";
import express from "express";
import cors from "cors";

const app = express();

// Allow CORS for all origins
app.use(cors());

// Load secret from environment variable or default to '123'
// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET || "123";
const PORT = 8088;

// Route to issue JWT
app.get("/token", (req, res) => {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const token = jwt.sign(
    {
      iat: now,
      exp: now + 10, // Token valid for 10 seconds
      name: "John Doe",
      sub: "admin@example.org",
      iss: `http://localhost:${PORT}`,
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
