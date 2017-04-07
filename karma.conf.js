module.exports = config => config.set({
  frameworks: ['mocha', 'browserify'],
  files: [
    't10-spec.js'
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
