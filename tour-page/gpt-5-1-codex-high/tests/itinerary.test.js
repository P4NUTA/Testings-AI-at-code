const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");
const { generateItinerary } = require("../src/logic/itinerary");
const app = require("../src/server");

test("generates deterministic itinerary for same seed", () => {
  const a = generateItinerary({ seed: "demo-seed" });
  const b = generateItinerary({ seed: "demo-seed" });
  assert.deepStrictEqual(a.days, b.days);
  assert.strictEqual(a.seedUsed, "demo-seed");
});

test("rejects invalid day count", () => {
  const result = generateItinerary({ days: 5 });
  assert.ok(result.error);
});

test("api returns itinerary in English", async () => {
  const res = await request(app).get("/api/itineraries?days=1&lang=en&mobility=low");
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.language, "en");
  assert.strictEqual(res.body.days.length, 1);
});

test("api handles invalid input with 400", async () => {
  const res = await request(app).get("/api/itineraries?days=9");
  assert.strictEqual(res.statusCode, 400);
  assert.ok(res.body.error);
});
