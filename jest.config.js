module.exports = {
  rootDir: "./",
  preset: "ts-jest",
  modulePathIgnorePatterns: ["temp"],
  testResultsProcessor: "jest-sonar-reporter",
  setupFilesAfterEnv: ["jest-extended"],
  reporters: ["default", ["jest-junit", { outputDirectory: "coverage" }]],
  coverageReporters: ["clover", "lcov", "text-summary", "cobertura"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.(t|j)s"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^LanguageData$": "<rootDir>/tests/mocks/language-data-mock.js",
  },
};
