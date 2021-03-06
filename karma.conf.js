/* jscs:disable */

'use strict';

let webpackConfig = require('./webpack.config.js');
webpackConfig.module.postLoaders = webpackConfig.module.postLoaders || [];
webpackConfig.module.postLoaders.push({
  test: /\.js$/,
  exclude: /(test|node_modules|bower_components)\//,
  loader: 'istanbul-instrumenter'
});

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'source/example/vendor.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'source/ng-localize.all.js',
      'test/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'source/**/*.js': ['webpack'],
      'test/**/*.js': ['webpack'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],


    coverageReporter: {
      dir: 'test/coverage',
      reporters: [
        { type: 'html' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.xml' },
      ],
      instrumenterOptions: {
        istanbul: { noCompact: true },
      },
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true,
    },


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
