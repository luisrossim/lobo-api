/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  testMatch: [
    "<rootDir>/src/tests/**/*.test.ts"
  ],
  modulePaths: [
    "<rootDir>"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setup.ts"
  ],
  moduleFileExtensions: [
    "ts", "js", "json", "node"
  ],
  verbose: true
};