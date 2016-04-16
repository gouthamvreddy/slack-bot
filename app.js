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

rtm.on(RTM_EVENTS.REACTION_ADDED, function(message) {
  let channel = message.item.channel;
  //Get a list of reactions for the specific message that a reaction was added to
  request.get('https://slack.com/api/reactions.get')
        .query({token: TOKEN})
        .query({channel: channel})
        .query({timestamp: message.item.ts})
        .end(function(err,res){
          //Count number of unique users who have a reaction
          let uniqueUsers = [];
          res.body.message.reactions.map(function(message){
            message.users.map(function(user){
              if(uniqueUsers.indexOf(user) == -1)
                uniqueUsers.push(user);
            })
          })
          let text = res.body.message.text;
          console.log(res.body.message);
          //If more than 1 user has added a reaction to message, post the message in the Watercooler channel
          if(uniqueUsers.length > 1) {
            request.get('https://slack.com/api/users.info')
                    .query({token: TOKEN})
                    .query({user: res.body.message.user})
                    .end(function(err,res){
                      rtm.sendMessage(res.body.user.profile.first_name + " says " + text, "C0ZPHKNDP");
                    })
          }
        });
});
