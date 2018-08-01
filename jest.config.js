module.exports = {
  rootDir: './src',
  setupFiles: ['<rootDir>/../test/setup.js'],
  transform: {
    ".*": "babel-jest",
  },
  verbose: true,
  testURL: 'http://localhost/',
};