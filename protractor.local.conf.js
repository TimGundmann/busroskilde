protractor = require('./protractor.conf');

protractor.config.capabilities = {
  'browserName': 'chrome',
  chromeOptions: {
    args: [
      '--window-size=1200,1000',
      '--disable-gpu'
    ],
  },
};

protractor.config.baseUrl = 'http://localhost:4200';

exports.config = protractor.config;
