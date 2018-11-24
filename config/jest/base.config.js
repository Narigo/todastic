const path = require("path");

module.exports = {
  coverageDirectory: "coverage",
  rootDir: path.resolve(__dirname, "../../"),
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  testMatch: ["<rootDir>/src/**/?(*.)spec.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  transform: {
    "^.+\\.scss$": "<rootDir>/config/jest/transform-scss.js",
    "^.+\\.svg$": "<rootDir>/config/jest/transform-svg.js",
    "^(?!.*\\.(js|json|scss|svg|tsx?)$)": "<rootDir>/config/jest/transform-file.js",
    "^.+\\.tsx?$": "<rootDir>/node_modules/babel-jest"
  },
  verbose: true
};
