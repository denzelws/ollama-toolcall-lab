import assert from "node:assert/strict";
import test from "node:test";
import { getWeather } from "./weather.js";

test("returns fake weather for a known city", () => {
  assert.equal(getWeather({ city: "São Paulo" }), "Warm and cloudy, 24°C.");
});

test("returns fake weather for Rio de Janeiro", () => {
  assert.equal(getWeather({ city: "rio de janeiro" }), "Hot and sunny, 32°C.");
});

test("returns fake weather for Rio de Janeiro (mixed case)", () => {
  assert.equal(getWeather({ city: "Rio de Janeiro" }), "Hot and sunny, 32°C.");
});

test("rejects an unknown city", () => {
  assert.throws(() => getWeather({ city: "Tokyo" }), /No fake weather/);
});

test("rejects missing or invalid city arguments", () => {
  assert.throws(() => getWeather({}), /city must be a non-empty string/);
  assert.throws(() => getWeather({ city: 42 }), /city must be a non-empty string/);
  assert.throws(() => getWeather({ city: "   " }), /city must be a non-empty string/);
});
