module.exports = {
  rootDir: __dirname,
  testEnvironment: "node",
  testURL: "http://localhost",
  transform: {
    "^.+\\.js$": "babel-jest"
  }
};