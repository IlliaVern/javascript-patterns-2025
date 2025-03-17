import fs from "node:fs/promises";

const COLUMN_WIDTHS = {
  city: 18,
  population: 10,
  area: 8,
  density: 8,
  country: 18,
  normalizedDensity: 6,
};

async function main() {
  try {
    const data = await readDataFile("./data.csv");

    const cities = parseData(data);

    const processedCities = processCities(cities);

    displayResults(processedCities);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

function readDataFile(filePath) {
  return fs.readFile(filePath, "utf-8");
}

function parseData(fileContent) {
  const lines = fileContent.trim().split("\n");
  const cityData = lines.slice(1);
  const cities = [];

  for (let i = 0; i < cityData.length; i++) {
    const line = cityData[i];

    const cityRecord = parseCityLine(line);

    cities.push(cityRecord);
  }

  return cities;
}

function parseCityLine(line) {
  const parts = line.split(",");

  return {
    city: parts[0],
    population: parts[1],
    area: parts[2],
    density: parseInt(parts[3]),
    country: parts[4],
  };
}

function processCities(cities) {
  const maxDensity = findMaxDensity(cities);
  const processedCities = [];

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const processed = {
      ...city,
      normalizedDensity: calculateNormalizedDensity(city.density, maxDensity),
    };
    processedCities.push(processed);
  }

  sortCitiesByDensity(processedCities);
  return processedCities;
}

function findMaxDensity(cities) {
  let max = cities[0].density;
  for (let i = 1; i < cities.length; i++) {
    max = Math.max(max, cities[i].density);
  }
  return max;
}

function calculateNormalizedDensity(density, maxDensity) {
  return Math.round((density * 100) / maxDensity);
}

function sortCitiesByDensity(cities) {
  for (let i = 0; i < cities.length - 1; i++) {
    for (let j = 0; j < cities.length - i - 1; j++) {
      if (cities[j].normalizedDensity < cities[j + 1].normalizedDensity) {
        [cities[j], cities[j + 1]] = [cities[j + 1], cities[j]];
      }
    }
  }
}

function formatCityLine(city) {
  return [
    city.city.padEnd(COLUMN_WIDTHS.city),
    city.population.padStart(COLUMN_WIDTHS.population),
    city.area.padStart(COLUMN_WIDTHS.area),
    city.density.toString().padStart(COLUMN_WIDTHS.density),
    city.country.padStart(COLUMN_WIDTHS.country),
    city.normalizedDensity.toString().padStart(COLUMN_WIDTHS.normalizedDensity),
  ].join("");
}

function displayResults(cities) {
  for (let i = 0; i < cities.length; i++) {
    const formattedLine = formatCityLine(cities[i]);
    console.log(formattedLine);
  }
}

main();
