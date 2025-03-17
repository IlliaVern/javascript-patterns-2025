# JavaScript Programming Paradigms Example

This project demonstrates three different programming paradigms implemented in JavaScript to process and display city data:
- Functional Programming (1-functional.js)
- Object-Oriented Programming (2-oop.js)
- Procedural Programming (3-procedural.js)

## Overview

The project reads city data from a CSV file and processes it to display information about cities, including their population, area, density, and a normalized density score. Each implementation achieves the same result using different programming paradigms.

## Implementations

### 1. Functional Implementation (1-functional.js)

The functional implementation uses modern JavaScript features and functional programming concepts:
- Uses array methods like `map`, `sort`, and spread operator
- Emphasizes immutable data transformation
- Chains operations using method chaining
- Avoids explicit loops and state mutations

To run:
```bash
npm run functional
```

### 2. Object-Oriented Implementation (2-oop.js)

The OOP implementation uses classes and encapsulation:
- `City` class for data encapsulation
- `CityDataProcessor` class for handling data processing
- Private methods using `#` prefix
- Clear separation of concerns
- Type validation and error handling

Classes and Methods:
- `City` class:
  - Constructor: Takes city data string in format "city,population,area,density,country"
  - `normalize(maxDensity)`: Calculates normalized density
  - `format()`: Returns formatted string representation
- `CityDataProcessor` class:
  - Constructor: Takes raw data input
  - Private methods: `#parse()`, `#calculateMaxDensity()`, `#normalize()`, `#sort()`, `#display()`
  - Public method: `process()` - Executes the complete data processing workflow

To run:
```bash
npm run oop
```

### 3. Procedural Implementation (3-procedural.js)

The procedural implementation uses traditional programming concepts:
- Structured programming with functions
- Step-by-step data processing
- Global constants
- Traditional loops and control structures
- Clear function naming and organization

Main Functions:
- `main()`: Orchestrates the complete workflow
- `readDataFile()`: Reads CSV data
- `parseData()`: Converts raw data to structured format
- `processCities()`: Handles data transformation
- `displayResults()`: Outputs formatted results

To run:
```bash
npm run procedural
```

## Project Structure

```
├── 1-functional.js    # Functional programming implementation
├── 2-oop.js          # Object-oriented programming implementation
├── 3-procedural.js   # Procedural programming implementation
├── data.csv          # Input data file
└── package.json      # Project configuration and scripts
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/IlliaVern/javascript-patterns-2025.git
```

2. Run any implementation:
```bash
npm run functional   # For functional implementation
npm run oop         # For OOP implementation
npm run procedural  # For procedural implementation
```

## Implementation Comparison

Each implementation has its own strengths:

- **Functional**: Best for data transformation pipelines and maintaining immutability. Code is concise and expressive. Great for handling data streams and parallel processing.
- **OOP**: Excellent for complex systems with clear entities and behaviors. Provides strong encapsulation and maintainability. Ideal for modeling real-world objects and their interactions.
- **Procedural**: Simple to understand and debug. Good for straightforward, sequential operations. Perfect for scripts and smaller applications.

## Technical Requirements

- Node.js 22.18.3 or higher
- ES Modules support (package.json has "type": "module")

## Author

Illia Vernygora

## License

ISC