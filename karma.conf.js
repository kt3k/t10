// karma.conf.js

module.exports = function (config) {
  'use strict';

  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      't10.js',
      't10-spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
