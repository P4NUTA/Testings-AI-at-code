const express = require("express");
const path = require("path");
const cors = require("cors");
const { generateItinerary } = require("./logic/itinerary");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicDir = path.join(__dirname, "..", "public");
app.use(express.static(publicDir));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/itineraries", (req, res) => {
  const { days, mobility, budget, lang, seed } = req.query;
  const normalizedLang = lang === "en" ? "en" : "ru";
  const payload = {
    days: days ? Number(days) : undefined,
    mobility: mobility || "low",
    budget: budget || "standard",
    lang: normalizedLang,
    seed: seed || undefined
  };

  const result = generateItinerary(payload);
  if (result.error) {
    return res.status(400).json({
      error: result.error,
      input: payload
    });
  }

  return res.json(result);
});

// Fallback to SPA entry for direct navigation.
app.get("*", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Tour Planner listening on http://localhost:${port}`);
  });
}

module.exports = app;
