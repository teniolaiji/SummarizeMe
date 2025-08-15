const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config(); // Load environment variables

const app = express();
const port = 3000;

app.use(express.static("public")); // Serve static files (index.html, styles.css, etc.)

app.get("/summarize", async (req, res) => {
  const url = req.query.url;
  const apiUrl = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(
    url
  )}&lang=en&engine=2`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY, // Use environment variable
      "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    res.json(data); // Return the summarized data to the client
  } catch (error) {
    res.status(500).json({ message: "Error fetching summary", error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
