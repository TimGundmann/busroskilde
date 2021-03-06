const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: [
        "--headless",
        '--window-size=1200,1000',
        '--disable-gpu'
      ],
    },
  },
  directConnect: true,
  baseUrl: 'http://192.168.1.100:9899',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 90000,
    print: function () { }
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    return global.browser.getProcessedConfig().then(function (config) {
      //it is ok to be empty
    });
  },
  plugins: [{
    package: 'protractor-screenshoter-plugin',
    screenshotPath: './REPORTS/e2e',
    screenshotOnExpect: 'failure+success',
    screenshotOnSpec: 'none',
    withLogs: true,
    writeReportFreq: 'asap',
    imageToAscii: 'none',
    clearFoldersBeforeTest: true
  }],
};
