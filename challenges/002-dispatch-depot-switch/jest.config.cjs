module.exports = {
  watchman: false,
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/tests/**/*.test.tsx"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  transform: {
    "^.+\\.[tj]sx?$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          ["@babel/preset-react", { runtime: "automatic" }],
          ["@babel/preset-typescript", { isTSX: true, allExtensions: true }]
        ]
      }
    ]
  }
};
