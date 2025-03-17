## javascript-patterns-2025

### Classes Documentation

The `2-oop.js` file contains two main classes for processing city data:

#### City Class
A class representing a city with various properties including population, area, and density.

Constructor parameters:
- `cityData` (string): Comma-separated string containing city data in format: "city,population,area,density,country"

Methods:
- `normalize(maxDensity)`: Calculates normalized density relative to the maximum density
- `format()`: Returns formatted string representation of city data

#### CityDataProcessor Class
A class for processing and displaying city data.

Constructor parameters:
- `rawData` (string): Raw data containing header row and city data rows

Methods:
- `process()`: Processes the raw data by parsing, normalizing, sorting, and displaying cities

Example usage:
```javascript
import fs from "node:fs/promises";

// Read city data from file
const rawData = await fs.readFile("cities.txt", "utf8");

// Create processor instance and process data
const processor = new CityDataProcessor(rawData);
processor.process();
```

Input data format should be:
```
City,Population,Area,Density,Country
Tokyo,37400068,8231,4544,Japan
Delhi,28514000,2240,12729,India
...
```
