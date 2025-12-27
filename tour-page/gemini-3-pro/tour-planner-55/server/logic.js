const { LOCATIONS } = require('./data/mockData');

function generateItinerary(days, rainMode, lang) {
  let availableLocations = [...LOCATIONS];
  const selectedLocations = [];
  
  // Filter logic
  if (rainMode) {
    // If rain mode is on, prefer indoor locations.
    // If a location is outdoor and has a rain alternative, swap it.
    // Otherwise, filter out outdoor locations.
    availableLocations = availableLocations.map(loc => {
      if (loc.type === 'outdoor' && loc.rainAlternativeId) {
        return LOCATIONS.find(l => l.id === loc.rainAlternativeId);
      }
      return loc;
    }).filter(loc => loc && loc.type === 'indoor');
  }

  // Simple selection logic (mocking a smart algorithm)
  // Select unique locations to fill the days (approx 2 activities per day)
  const activitiesPerDay = 2;
  const totalActivities = days * activitiesPerDay;
  
  // Deterministic shuffle based on days to vary slightly but remain predictable for this mock
  const shuffled = availableLocations.sort((a, b) => 0.5 - Math.random()); 
  // Note: System prompt requires deterministic seeds, but standard Math.random is used here for simplicity in mock. 
  // To be strictly deterministic as per prompt "Use deterministic seeds", I will implement a simple pseudo-random.
  
  let seed = days * 1337;
  const pseudoRandom = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  
  const deterministicShuffled = availableLocations.sort((a, b) => 0.5 - pseudoRandom());

  for (let i = 0; i < totalActivities; i++) {
    if (deterministicShuffled[i]) {
      selectedLocations.push(deterministicShuffled[i]);
    }
  }

  // Calculate totals
  const totalCost = selectedLocations.reduce((sum, loc) => sum + loc.costRub, 0);
  const totalTime = selectedLocations.reduce((sum, loc) => sum + loc.timeHours, 0);

  // Format for response
  const dailyItinerary = [];
  for (let i = 0; i < days; i++) {
    dailyItinerary.push({
      day: i + 1,
      activities: selectedLocations.slice(i * activitiesPerDay, (i + 1) * activitiesPerDay).map(loc => ({
        ...loc,
        name: loc.name[lang],
        description: loc.description[lang]
      }))
    });
  }

  return {
    locations: dailyItinerary,
    totalCost,
    totalTime
  };
}

module.exports = { generateItinerary };
