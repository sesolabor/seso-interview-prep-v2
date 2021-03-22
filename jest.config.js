// See: https://github.com/willianantunes/nextjs-playground/blob/master/jest.config.js
module.exports = {
  preset: "ts-jest",
  transform: {
    "\\.ts$": ["ts-jest"],
    "^.+\\.tsx$": ["babel-jest"],
  },
  testEnvironment: "node",
  testRegex: "\\.jest\\.",
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
  testTimeout: 6000,
  moduleNameMapper: {
    // Will NOT handle /index files
    "^@/server$": "<rootDir>/server.ts",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/client-state/(.*)$": "<rootDir>/client-state/$1",
    "^@/services/(.*)$": "<rootDir>/services/$1",
    "^@/repositories/(.*)$": "<rootDir>/repositories/$1",
    "^@/__test-utils__/(.*)$": "<rootDir>/__test-utils__/$1",
    "^@/workers/(.*)$": "<rootDir>/workers/$1",

    // Will handle /index files
    "^@/pages": "<rootDir>/pages",
    "^@/lib": "<rootDir>/lib",
    "^@/components": "<rootDir>/components",
    "^@/client-state": "<rootDir>/client-state",
    "^@/services": "<rootDir>/services",
    "^@/repositories": "<rootDir>/repositories",
    "^@/__test-utils__": "<rootDir>/__test-utils__",
    "^@/workers": "<rootDir>/workers",

    // Mock css/assets
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__test-utils__/mocks/file-mock.js",
    // See: https://github.com/vercel/next.js/blob/canary/examples/with-jest/jest.config.js
    "\\.(css|less)$": "identity-obj-proxy",
  },
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/node_modules/", "enzyme.js", "/.next/"],
  coverageReporters: ["json", "lcov", "text", "text-summary"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  transformIgnorePatterns: ["/node_modules/", "^.+\\.module\\.(css|sass|scss)$"],
  globalSetup: "<rootDir>/__test-utils__/global-setup.ts",
  globalTeardown: "<rootDir>/__test-utils__/global-teardown.ts",
  setupFilesAfterEnv: ["<rootDir>/__test-utils__/setup-files-after-env.ts"],
  maxWorkers: 5,
};
