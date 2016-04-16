'use strict';

module.exports = {
  getToken: function() {
    try {
      let SLACK_TOKEN = require('./config.js').SLACK_TOKEN;
      return SLACK_TOKEN;
    } catch(e) {
        console.log('No local config.js file');
        return '';
    }
  }
};
