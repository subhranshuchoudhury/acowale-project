// index.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.GNEWS_API_KEY;

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

https: app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
