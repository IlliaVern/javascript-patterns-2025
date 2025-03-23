import fs from "node:fs/promises";

const data = await fs.readFile("./data.csv", "utf-8");

const [_header, ...cityData] = data.trim().split("\n");

const COLUMN_WIDTHS = {
  city: 18,
  population: 10,
  area: 8,
  density: 8,
  country: 18,
  normalizedDensity: 6,
};

const processedData = cityData.map((line) => {
  const [city, population, area, density, country] = line.split(",");
  return {
    city,
    population,
    area,
    density: parseInt(density),
    country,
  };
});

const maxDensity = Math.max(...processedData.map((city) => city.density));

const formattedCities = processedData
  .map((city) => ({
    ...city,
    normalizedDensity: Math.round((city.density * 100) / maxDensity),
  }))
  .sort((a, b) => b.normalizedDensity - a.normalizedDensity)
  .map(({ city, population, area, density, country, normalizedDensity }) =>
    [
      city.padEnd(COLUMN_WIDTHS.city),
      population.padStart(COLUMN_WIDTHS.population),
      area.padStart(COLUMN_WIDTHS.area),
      density.toString().padStart(COLUMN_WIDTHS.density),
      country.padStart(COLUMN_WIDTHS.country),
      normalizedDensity.toString().padStart(COLUMN_WIDTHS.normalizedDensity),
    ].join("")
  );

formattedCities.forEach((line) => console.log(line));
