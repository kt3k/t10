module.exports = config => config.set({
  frameworks: ['mocha', 'browserify'],
  files: [
    'test.js'
  ],
  preprocessors: {
    '*.js': ['browserify']
  },
  browserify: {
    transform: [['babelify', { plugins: ['istanbul'] }]]
  },
  reporters: ['progress', 'coverage'],
  coverageReporter: { type: 'lcov' },
  browsers: ['Firefox'],
  singleRun: true
})
