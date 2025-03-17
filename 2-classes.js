import fs from "node:fs/promises";

class City {
  constructor(cityData) {
    if (!cityData) {
      throw new Error("City data is required");
    }

    const parts = cityData.split(",");
    if (parts.length !== 5) {
      throw new Error("Invalid city data format");
    }

    const [city, population, area, density, country] = parts;
    const parsedDensity = parseInt(density);

    if (isNaN(parsedDensity)) {
      throw new Error("Invalid density value");
    }

    this.city = city;
    this.population = parseInt(population);
    this.area = parseFloat(area);
    this.density = parsedDensity;
    this.country = country;
    this.normalizedDensity = 0;
  }

  normalize(maxDensity) {
    this.normalizedDensity = Math.round((this.density * 100) / maxDensity);
    return this;
  }

  static COLUMN_WIDTHS = {
    city: 18,
    population: 10,
    area: 8,
    density: 8,
    country: 18,
    normalizedDensity: 6,
  };

  format(columnWidths = City.COLUMN_WIDTHS) {
    return [
      this.city.padEnd(columnWidths.city),
      this.population.toString().padStart(columnWidths.population),
      this.area.toString().padStart(columnWidths.area),
      this.density.toString().padStart(columnWidths.density),
      this.country.padStart(columnWidths.country),
      this.normalizedDensity
        .toString()
        .padStart(columnWidths.normalizedDensity),
    ].join("");
  }
}

class CityDataProcessor {
  constructor(rawData) {
    this.rawData = rawData;
    this.cities = [];
  }

  #parse() {
    const [_headers, ...dataRows] = this.rawData.trim().split("\n");
    this.cities = dataRows.map((row) => new City(row));
    return this;
  }

  #calculateMaxDensity() {
    return Math.max(...this.cities.map((city) => city.density));
  }

  #normalize() {
    const maxDensity = this.#calculateMaxDensity();
    this.cities = this.cities.map((city) => city.normalize(maxDensity));
    return this;
  }

  #sort() {
    this.cities.sort((a, b) => b.normalizedDensity - a.normalizedDensity);
    return this;
  }

  #display() {
    this.cities.forEach((city) => console.log(city.format()));
  }

  process() {
    return this.#parse().#normalize().#sort().#display();
  }
}

try {
  const data = await fs.readFile("./data.csv", "utf-8");

  const processor = new CityDataProcessor(data);

  processor.process();
} catch (error) {
  console.error("Error processing file:", error.message);
}