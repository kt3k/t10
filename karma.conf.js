module.exports = config => config.set({
  frameworks: ['mocha', 'browserify'],
  files: [
    'test.js'
  ],
  preprocessors: {
    '*.js': ['browserify']
  },
  browserify: {
    transform: [['babelify', { presets: ['es2015'], plugins: ['istanbul'] }]]
  },
  reporters: ['progress', 'coverage'],
  coverageReporter: { type: 'lcov' },
  browsers: ['Firefox'],
  singleRun: true
})
