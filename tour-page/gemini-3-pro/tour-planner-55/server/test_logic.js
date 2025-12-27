const { generateItinerary } = require('./logic');
const assert = require('assert');

console.log('Running logic tests...');

// Test 1: Basic Generation
const result1 = generateItinerary(1, false, 'ru');
assert.strictEqual(result1.locations.length, 1, 'Should generate 1 day');
assert.strictEqual(result1.locations[0].activities.length, 2, 'Should have 2 activities per day');
console.log('Test 1 Passed: Basic Generation');

// Test 2: Rain Mode
const result2 = generateItinerary(1, true, 'en');
result2.locations.forEach(day => {
  day.activities.forEach(act => {
    assert.strictEqual(act.type, 'indoor', 'Rain mode should only have indoor activities');
  });
});
console.log('Test 2 Passed: Rain Mode enforces indoor locations');

console.log('All tests passed successfully.');
