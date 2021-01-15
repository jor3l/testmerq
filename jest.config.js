module.exports = {
  testEnvironment: "node",
  transform: { "\\.[jt]sx?$": "babel-jest" },
  setupFilesAfterEnv: ["./setupTests.js"],
};
