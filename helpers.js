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
  getMessage: options => {
    return new Promise((resolve, reject) => {
      request.get('https://slack.com/api/reactions.get')
        .query({token: options.token || ''})
        .query({file: options.file || ''})
        .query({file_comment: options.file_comment || ''})
        .query({channel: options.channel || ''})
        .query({timestamp: options.timestamp || ''})
        .query({full: options.full || ''})
        .end((err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
    });
  },
  // Fetch Slack User Info
  getUserInfo: options => {
    return new Promise((resolve, reject) => {
      request.get('https://slack.com/api/users.info')
        .query({token: options.token || ''})
        .query({user: options.user || ''})
        .end((err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
    });
  }
};
