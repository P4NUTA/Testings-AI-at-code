const express = require('express');
const cors = require('cors');
const path = require('path');
const { generateItinerary } = require('./logic');
const { LOCATIONS, TRANSLATIONS } = require('./data/mockData');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files from the built client directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// API Endpoints
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.get('/api/translations', (req, res) => {
  res.json(TRANSLATIONS);
});

app.post('/api/plan', (req, res) => {
  try {
    const { days, language, rainMode } = req.body;
    const itinerary = generateItinerary(days || 1, rainMode || false, language || 'ru');
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
});

// Catch-all for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
