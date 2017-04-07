module.exports = config => config.set({
  frameworks: ['mocha', 'browserify'],
  files: [
    'test.js'
  ],
  preprocessors: {
    '*.js': ['browserify']
  },
  browserify: {
  },
  reporters: ['progress'],
  browsers: ['Firefox'],
  singleRun: true
})
