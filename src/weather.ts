export type WeatherArgs = { city?: unknown };

const weatherByCity: Record<string, string> = {
  "são paulo": "Warm and cloudy, 24°C.",
  "rio de janeiro": "Hot and sunny, 32°C.",
  london: "Cool and rainy, 12°C.",
};

export function getWeather(args: WeatherArgs): string {
  if (typeof args?.city !== "string" || args.city.trim() === "") {
    throw new Error("city must be a non-empty string");
  }

  const weather = weatherByCity[args.city.trim().toLowerCase()];
  if (!weather) {
    throw new Error(`No fake weather is available for ${args.city}.`);
  } 

  return weather;
}
