'use strict';

var chromiumRevision = require('puppeteer/package.json').puppeteer.chromium_revision;
var downloader = require('puppeteer/utils/ChromiumDownloader');
var revisionInfo = downloader.revisionInfo(downloader.currentPlatform(), chromiumRevision);

process.env.CHROME_BIN = revisionInfo.executablePath;

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['lasso', 'mocha', 'chai'],
        lasso: {
            plugins: [
                'lasso-less',
                'lasso-marko'
            ],
            minify: false,
            bundlingEnabled: false,
            resolveCssUrls: true,
            cacheProfile: 'test',
            tempdir: './.test'
        },
        plugins: [
            'karma-chai',
            'karma-mocha',
            'karma-lasso',
            'karma-mocha-reporter',
            'karma-chrome-launcher'
        ],
        files: [
            {
                pattern: 'test/functional-test/*.js',
                included: true,
                nocache: false
            }
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: true,
        logLevel: config.LOG_DEBUG,
        browsers: ['ChromeHeadless']
    });
};
