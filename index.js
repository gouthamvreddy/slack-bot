var Slack = require('@slack/client');
var RtmClient = Slack.RtmClient;
var RTM_EVENTS = Slack.RTM_EVENTS;

var token = process.env.SLACK_TOKEN || '';

var rtm = new RtmClient(token, { logLevel: 'info' });

rtm.start();

rtm.on(RTM_EVENTS.REACTION_ADDED, function(message) {
  var channel = message.channel;
  var text = message.text;
  console.log(channel);
  console.log(message);
  rtm.sendMessage(text, "C0ZPHKNDP");
});
