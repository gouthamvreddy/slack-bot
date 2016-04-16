'use strict';

const request = require('superagent');

module.exports = {
  // Get SLACK_TOKEN from config file
  getToken: function() {
    try {
      let SLACK_TOKEN = require('./config.js').SLACK_TOKEN;
      return SLACK_TOKEN;
    } catch(e) {
        console.log('No local config.js file');
        return '';
    }
  },
  // Fetch Slack Message
  getMessage: function(options) {
    return new Promise((resolve, reject) => {
     let token = options.token || '';
     let file = options.file || '';
     let file_comment = options.file_comment || '';
     let channel = options.channel || '';
     let timestamp = options.timestamp || '';
     let full = options.full || '';

      request.get('https://slack.com/api/reactions.get')
        .query({token: token})
        .query({file: file})
        .query({file_comment: file_comment})
        .query({channel: channel})
        .query({timestamp: timestamp})
        .query({full: full})
        .end((err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
    });
  },
  // Fetch Slack User Info
  getUserInfo: function(options) {
    return new Promise((resolve, reject) => {
      let token = options.token || '';
      let user = options.user || '';

      request.get('https://slack.com/api/users.info')
        .query({token: token})
        .query({user: user})
        .end((err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
    });
  }
};
