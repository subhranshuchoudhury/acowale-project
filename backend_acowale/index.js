const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Define allowed origin
const allowedOrigins = ["https://acowalenews.web.app"];

// CORS middleware configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // Block the request if the origin is not allowed
        return callback(
          new Error("CORS policy: This origin is not allowed"),
          false
        );
      }
      return callback(null, true);
    },
  })
);

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.GNEWS_API_KEY;

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the News API");
});

app.get("/api/news", async (req, res) => {
  const { q, lang, country, topic, page, max, category } = req.query;

  try {
    const response = await axios.get("https://gnews.io/api/v4/search", {
      params: {
        q: q || "latest",
        lang: lang || "en",
        country: country || "us",
        topic: topic || "general",
        page: page || 1,
        max: max || 10,
        token: API_KEY,
        category: category || "general",
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
