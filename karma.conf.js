module.exports = config => config.set({
  frameworks: ['mocha', 'browserify'],
  files: [
    'test.js'
  ],
  preprocessors: {
    '*.js': ['browserify']
  },
  browserify: {
    debug: true,
    transform: [['babelify', { presets: ['@babel/preset-env'], plugins: ['istanbul'] }]]
  },
  reporters: ['progress', 'coverage'],
  coverageReporter: { type: 'lcov' },
  browsers: ['Firefox'],
  singleRun: true
})
