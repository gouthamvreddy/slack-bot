'use strict';

const Slack = require('@slack/client');
const request = require('superagent');
const RtmClient = Slack.RtmClient;
const RTM_EVENTS = Slack.RTM_EVENTS;
const _helpers = require('./helpers');
const TOKEN = process.env.SLACK_TOKEN || _helpers.getToken();

let rtm = new RtmClient(TOKEN, { logLevel: 'info' });

rtm.start();
console.log('Slack Real Time Messaging Client Started');

// Listen for Reactions
rtm.on(RTM_EVENTS.REACTION_ADDED, message => {
  let channel = message.item.channel;
  let options = {
    token: TOKEN,
    channel: channel,
    timestamp: message.item.ts
  };
  //Get list of reactions for the specific message that a reaction was added to
  _helpers.getMessage(options).then(res => {
    //Count number of unique users who have a reaction
    let uniqueUsers = [];
    res.body.message.reactions.map(message => {
      message.users.map(user => {
        if (uniqueUsers.indexOf(user) == -1)
          uniqueUsers.push(user);
      });
    });
    let text = res.body.message.text;
    // If more than 1 user has added a reaction to message, post the
    // message in the Watercooler channel
    if (uniqueUsers.length > 1) {
      options.user = res.body.message.user;
      _helpers.getUserInfo(options).then(res => {
        rtm.sendMessage(res.body.user.profile.first_name +
          ' says ' + text, 'C0ZPHKNDP');
      });
    }
  });
});
