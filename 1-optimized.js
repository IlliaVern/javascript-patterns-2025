const data = require("./data.csv");

const [_header, ...cityData] = data.trim().split("\n");

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
      city.padEnd(18),
      population.padStart(10),
      area.padStart(8),
      density.toString().padStart(8),
      country.padStart(18),
      normalizedDensity.toString().padStart(6),
    ].join("")
  );

formattedCities.forEach((line) => console.log(line));
